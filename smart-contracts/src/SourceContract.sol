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
    error NEED_TO_SEND_SOME_TOKENS();
    error FAILED_TO_RECEIVE_TOKEN();

    address public immutable i_router;
    address public immutable i_link;

    event LendMessageSent(bytes32 messageId);
    event BorrowMessageSent(bytes32 messageId);
    event RePayMessageSent(bytes32 messageId);
    event RemoveLendMessageSent(bytes32 messageId);
    event BorrowedToken(address token, uint256 amount);

    address private owner;

    mapping(address => bool) public allowedToken;

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
        if (!allowedToken[_tokenAddress]) revert TOKEN_NOT_SUPPORTED();
        _;
    }

    modifier amountNotZero(uint256 _amount) {
        if (_amount == 0) revert NEED_TO_SEND_SOME_TOKENS();
        _;
    }

    function setAllowedToken(
        address _tokenAddress,
        bool _allowed
    ) public onlyOwner {
        allowedToken[_tokenAddress] = _allowed;
        allowedTokenArray.push(_tokenAddress);
    }

    // function to lend the tokens to the protocol
    function lendToken(
        address _token,
        uint256 _amount,
        uint64 destinationChainSelector,
        address receiver // reciever contract address that implemented _ccipReceive function
    ) public onlyAllowedTokens(_token) amountNotZero(_amount) {
        // Recieve token from the user
        bool receiveToken = IERC20(_token).transferFrom(
            msg.sender,
            address(this),
            _amount
        );
        if (!receiveToken) revert FAILED_TO_RECEIVE_TOKEN();

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
            feeToken: i_link
        });

        uint256 fee = IRouterClient(i_router).getFee(
            destinationChainSelector,
            message
        );

        bytes32 messageId;

        LinkTokenInterface(i_link).approve(i_router, fee);
        messageId = IRouterClient(i_router).ccipSend(
            destinationChainSelector,
            message
        );

        emit LendMessageSent(messageId);
    }

    function borrowTokenMessage(
        address _token,
        uint256 _amount,
        uint64 destinationChainSelector,
        uint64 calledChainSelector, // enter chain selector on which this smart contract is deployed to
        address _receiver, // reciever contract address that implemented _ccipReceive function on destination chain
        address _calledReciever // reciever contract address that implemented _ccipReceive function on source chain
    ) public onlyAllowedTokens(_token) amountNotZero(_amount) {
        // update and check the balance on balance contract using Chainlink CCIP
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(_receiver),
            data: abi.encodeWithSignature(
                "borrow(address,uint256,uint64,address)",
                _token,
                _amount,
                calledChainSelector,
                _calledReciever
            ),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: "",
            feeToken: i_link
        });

        uint256 fee = IRouterClient(i_router).getFee(
            destinationChainSelector,
            message
        );

        bytes32 messageId;

        LinkTokenInterface(i_link).approve(i_router, fee);
        messageId = IRouterClient(i_router).ccipSend(
            destinationChainSelector,
            message
        );
        emit BorrowMessageSent(messageId);
    }

    function borrowToken(address _token, uint256 _amount) public {
        bool sent = IERC20(_token).transfer(msg.sender, _amount);
        if (!sent) revert FAILED_TO_BORROW();
        emit BorrowedToken(_token, _amount);
    }

    function rePayFullAmount(
        address _token,
        uint256 _amount,
        uint64 destinationChainSelector,
        address _receiver
    ) public onlyAllowedTokens(_token) {
        bool receiveToken = IERC20(_token).transferFrom(
            msg.sender,
            address(this),
            _amount
        );
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
            feeToken: i_link
        });

        uint256 fee = IRouterClient(i_router).getFee(
            destinationChainSelector,
            message
        );

        bytes32 messageId;

        LinkTokenInterface(i_link).approve(i_router, fee);
        messageId = IRouterClient(i_router).ccipSend(
            destinationChainSelector,
            message
        );

        emit RePayMessageSent(messageId);
    }

    function removeLendMessage(
        address _token,
        uint256 _amount,
        uint64 destinationChainSelector,
        address _receiver
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
            feeToken: i_link
        });

        uint256 fee = IRouterClient(i_router).getFee(
            destinationChainSelector,
            message
        );

        bytes32 messageId;

        LinkTokenInterface(i_link).approve(i_router, fee);
        messageId = IRouterClient(i_router).ccipSend(
            destinationChainSelector,
            message
        );

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

    function isTokenSupported(address _token) public view returns (bool) {
        return allowedToken[_token];
    }

    function ownerAddr() public view returns (address) {
        return owner;
    }
}
