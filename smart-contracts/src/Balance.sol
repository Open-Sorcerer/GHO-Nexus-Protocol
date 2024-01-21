// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.0/contracts/token/ERC20/IERC20.sol";
import {PriceConverter} from "./PriceConverter.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";

contract Balance {
    error ONLY_OWNER_CALL_THIS_FUNCTION();
    error BORROW_LIMIT_EXCEED();
    error NOT_ENOUGH_AMOUNT_REPAYFULL();
    error NOT_ENOUGH_TOKEN_LENDED();

    address private immutable i_router;
    address private immutable i_link;
    address private owner;
    uint256 private threshold = 80;
    uint256 private borrowInterestRate = 5;

    // user address => (Token address =>  lend balance of user)
    mapping(address => mapping(address => uint256)) public userLendTokenBalance;

    // Lend balance of the user
    // user address => lend balance of user
    mapping(address => uint256) public userLendBalance;

    // mapping to check that this is Ethereum
    mapping(address => bool) public isEthereum;

    // Borrow balance of the user of Token
    // user address => (Token address => Borrow balance of user)
    mapping(address => mapping(address => uint256))
        public userBorrowTokenBalance;

    // Borrow balance of the user
    // user address => Borrow balance of user
    mapping(address => uint256) public borrowBalance;

    mapping(address => bool) public allowedToken;

    event ReceivedLendMessage();
    event ReceivedBorrowMessage();
    event ReceivedRePayFullMessage();
    event ReceivedremoveLendBalanceMessage();

    address[] public allowedTokenArray;

    constructor(address _owner, address _router, address _link) {
        owner = _owner;
        i_router = _router;
        i_link = _link;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert ONLY_OWNER_CALL_THIS_FUNCTION();
        _;
    }

    function setAllowedToken(
        address _tokenAddress,
        bool _allowed
    ) public onlyOwner {
        allowedToken[_tokenAddress] = _allowed;
        allowedTokenArray.push(_tokenAddress);
    }

    function setThreshold(uint256 _newThreshold) public onlyOwner {
        threshold = _newThreshold;
    }

    function setIsEthereum(
        address _tokenAddress,
        bool _allowed
    ) public onlyOwner {
        isEthereum[_tokenAddress] = _allowed;
    }

    // function to update the data of the tokens
    function lend(address _user, address _token, uint256 _amount) public {
        userLendTokenBalance[_user][_token] += _amount;

        if (isEthereum[_token]) {
            userLendBalance[_user] += PriceConverter.getEthInUsd(_amount);
        } else {
            userLendBalance[_user] += _amount;
        }

        emit ReceivedLendMessage();
    }

    function borrow(
        address _user,
        address _token,
        uint256 _amount,
        uint64 calledChainSelector,
        address receiver
    ) public {
        uint256 amount;
        if (isEthereum[_token]) {
            amount = PriceConverter.getEthInUsd(_amount);
        } else {
            amount = _amount;
        }

        if (amount > getBorrowLimitLeft(_user)) {
            revert BORROW_LIMIT_EXCEED();
        }

        userBorrowTokenBalance[_user][_token] += _amount;
        borrowBalance[_user] += amount;

        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: abi.encodeWithSignature(
                "borrowToken(address,address,uint256)",
                _user,
                _token,
                _amount
            ),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: "",
            feeToken: i_link
        });

        uint256 fee = IRouterClient(i_router).getFee(
            calledChainSelector,
            message
        );

        bytes32 messageId;

        LinkTokenInterface(i_link).approve(i_router, fee);
        messageId = IRouterClient(i_router).ccipSend(
            calledChainSelector,
            message
        );

        emit ReceivedBorrowMessage();
    }

    function rePayFull(address _user, address _token, uint256 _amount) public {
        uint256 amount;
        if (isEthereum[_token]) {
            amount = PriceConverter.getEthInUsd(_amount);
        } else {
            amount = _amount;
        }

        if (amount < ((borrowBalance[_user] * borrowInterestRate) / 100))
            revert NOT_ENOUGH_AMOUNT_REPAYFULL();

        uint256 length = allowedTokenArray.length;
        unchecked {
            for (uint256 i = 0; i < length; ) {
                userBorrowTokenBalance[_user][allowedTokenArray[i]] = 0;
                ++i;
            }
        }
        borrowBalance[_user] = 0;

        emit ReceivedRePayFullMessage();
    }

    function removeLendBalance(
        address _user,
        address _token,
        uint256 _amount,
        uint64 calledChainSelector,
        address receiver
    ) public {
        uint256 amount;
        if (isEthereum[_token]) {
            amount = PriceConverter.getEthInUsd(_amount);
        } else {
            amount = _amount;
        }

        if (userLendTokenBalance[_user][_token] < _amount)
            revert NOT_ENOUGH_TOKEN_LENDED();

        userLendTokenBalance[_user][_token] -= _amount;
        userLendBalance[_user] -= amount;

        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: abi.encodeWithSignature(
                "removeLend(address,address,uint256)",
                _user,
                _token,
                _amount
            ),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: "",
            feeToken: i_link
        });

        uint256 fee = IRouterClient(i_router).getFee(
            calledChainSelector,
            message
        );

        bytes32 messageId;

        LinkTokenInterface(i_link).approve(i_router, fee);
        messageId = IRouterClient(i_router).ccipSend(
            calledChainSelector,
            message
        );

        emit ReceivedremoveLendBalanceMessage();
    }

    // function to get the Borrow limit of the user
    function getBorrowLimit(address _user) public view returns (uint256) {
        return ((userLendBalance[_user] * threshold) / 100);
    }

    // function to get the amount the user already borrowed
    function getAlreadyBorrowed(address _user) public view returns (uint256) {
        return borrowBalance[_user];
    }

    // function to get the amount the user van borrow more
    function getBorrowLimitLeft(address _user) public view returns (uint256) {
        return getBorrowLimit(_user) - getAlreadyBorrowed(_user);
    }

    function getBorrowTokenAmount(
        address _user,
        address _token
    ) public view returns (uint256) {
        return userBorrowTokenBalance[_user][_token];
    }

    function getUserLendTokenAmount(
        address _user,
        address _token
    ) public view returns (uint256) {
        return userLendTokenBalance[_user][_token];
    }

    function getUserLendAmount(address _user) public view returns (uint256) {
        return userLendBalance[_user];
    }

    function isTokenSupported(address _token) public view returns (bool) {
        return allowedToken[_token];
    }

    function ownerAddr() public view returns (address) {
        return owner;
    }

    function getRouterAddress() public view returns (address) {
        return i_router;
    }

    function getLinkAddress() public view returns (address) {
        return i_link;
    }

    function getThreshold() public view returns (uint256) {
        return threshold;
    }

    function getborrowInterestRate() public view returns (uint256) {
        return borrowInterestRate;
    }
}
