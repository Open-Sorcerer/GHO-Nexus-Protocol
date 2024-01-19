// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.0/contracts/token/ERC20/IERC20.sol";
import {PriceConverter} from "./PriceConverter.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";

contract SourceContract {
    error ONLY_OWNER_CALL_THIS_FUNCTION();
    error TOKEN_NOT_SUPPORTED();
    error BORROW_LIMIT_EXCEED();
    error FAILED_TO_BORROW();
    error NOT_ENOUGH_AMOUNT_REPAYFULL();
    error FAILED_TO_LEND();
    error FAILED_TO_REPAY();
    error FAILED_TO_WITHDRAW();
    error NOT_ENOUGH_TOKEN_LENDED();

    enum PayFeesIn {
        Native,
        LINK
    }

    address public immutable i_router;
    address public immutable i_link;

    event LendMessageSent(bytes32 messageId);
    event BorrowMessageSent(bytes32 messageId);
    event RePayMessageSent(bytes32 messageId);
    event RemoveLendMessageSent(bytes32 messageId);

    address private owner;
    uint256 public threshold = 80;

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

    mapping(address => bool) public allowedBalanceContract;

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

    modifier onlyAllowedTokens(address _tokenAddress) {
        if (allowedToken[_tokenAddress]) revert TOKEN_NOT_SUPPORTED();
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

    // function to lend the tokens to the protocol
    function lendToken(
        address _token,
        uint256 _amount,
        uint64 destinationChainSelector,
        address receiver,
        PayFeesIn payFeesIn
    ) public onlyAllowedTokens(_token) {
        // Recieve token from the user
        bool receiveToken = IERC20(_token).transfer(address(this), _amount);
        if (!receiveToken) revert FAILED_TO_LEND();

        // update the balance on balance contract using Chainlink CCIP
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: abi.encodeWithSignature(
                "lend(address,uint256)",
                _token,
                _amount
            ),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: "",
            feeToken: payFeesIn == PayFeesIn.LINK ? i_link : address(0)
        });

        uint256 fee = IRouterClient(i_router).getFee(
            destinationChainSelector,
            message
        );

        bytes32 messageId;

        if (payFeesIn == PayFeesIn.LINK) {
            LinkTokenInterface(i_link).approve(i_router, fee);
            messageId = IRouterClient(i_router).ccipSend(
                destinationChainSelector,
                message
            );
        } else {
            messageId = IRouterClient(i_router).ccipSend{value: fee}(
                destinationChainSelector,
                message
            );
        }

        emit LendMessageSent(messageId);
    }

    function borrowTokenMessage(
        address _token,
        uint256 _amount,
        uint64 destinationChainSelector,
        address _receiver,
        PayFeesIn payFeesIn
    ) public onlyAllowedTokens(_token) {
        // update and check the balance on balance contract using Chainlink CCIP
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(_receiver),
            data: abi.encodeWithSignature(
                "borrow(address,uint256,uint64,address,PayFeesIn)",
                _token,
                _amount,
                destinationChainSelector,
                _receiver,
                payFeesIn
            ),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: "",
            feeToken: payFeesIn == PayFeesIn.LINK ? i_link : address(0)
        });

        uint256 fee = IRouterClient(i_router).getFee(
            destinationChainSelector,
            message
        );

        bytes32 messageId;

        if (payFeesIn == PayFeesIn.LINK) {
            LinkTokenInterface(i_link).approve(i_router, fee);
            messageId = IRouterClient(i_router).ccipSend(
                destinationChainSelector,
                message
            );
        } else {
            messageId = IRouterClient(i_router).ccipSend{value: fee}(
                destinationChainSelector,
                message
            );
        }
        emit BorrowMessageSent(messageId);
    }

    function borrowToken(address _token, uint256 _amount) public {
        bool sent = IERC20(_token).transferFrom(
            address(this),
            msg.sender,
            _amount
        );
        if (!sent) revert FAILED_TO_BORROW();
    }

    function rePayFullAmount(
        address _token,
        uint256 _amount,
        uint64 destinationChainSelector,
        address _receiver,
        PayFeesIn payFeesIn
    ) public onlyAllowedTokens(_token) {
        bool receiveToken = IERC20(_token).transfer(address(this), _amount);
        if (!receiveToken) revert FAILED_TO_REPAY();

        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(_receiver),
            data: abi.encodeWithSignature(
                "rePayFull(address,uint256)",
                _token,
                _amount
            ),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: "",
            feeToken: payFeesIn == PayFeesIn.LINK ? i_link : address(0)
        });

        uint256 fee = IRouterClient(i_router).getFee(
            destinationChainSelector,
            message
        );

        bytes32 messageId;

        if (payFeesIn == PayFeesIn.LINK) {
            LinkTokenInterface(i_link).approve(i_router, fee);
            messageId = IRouterClient(i_router).ccipSend(
                destinationChainSelector,
                message
            );
        } else {
            messageId = IRouterClient(i_router).ccipSend{value: fee}(
                destinationChainSelector,
                message
            );
        }
        emit RePayMessageSent(messageId);
    }

    function removeLendMessage(
        address _token,
        uint256 _amount,
        uint64 destinationChainSelector,
        address _receiver,
        PayFeesIn payFeesIn
    ) public onlyAllowedTokens(_token) {
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(_receiver),
            data: abi.encodeWithSignature(
                "removeLendBalance(address,uint256,uint64,address,PayFeesIn)",
                _token,
                _amount
            ),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: "",
            feeToken: payFeesIn == PayFeesIn.LINK ? i_link : address(0)
        });

        uint256 fee = IRouterClient(i_router).getFee(
            destinationChainSelector,
            message
        );

        bytes32 messageId;

        if (payFeesIn == PayFeesIn.LINK) {
            LinkTokenInterface(i_link).approve(i_router, fee);
            messageId = IRouterClient(i_router).ccipSend(
                destinationChainSelector,
                message
            );
        } else {
            messageId = IRouterClient(i_router).ccipSend{value: fee}(
                destinationChainSelector,
                message
            );
        }
        emit RemoveLendMessageSent(messageId);
    }

    function removeLend(
        address _token,
        uint256 _amount
    ) public onlyAllowedTokens(_token) {
        bool sent = IERC20(_token).transferFrom(
            address(this),
            msg.sender,
            ((_amount * 3) / 100)
        );
        if (!sent) revert FAILED_TO_WITHDRAW();
    }

    // function to get the Borrow limit of the user
    function getBorrowLimit(address _user) public view returns (uint256) {
        return ((userLendBalance[_user] * 80) / 100);
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
}
