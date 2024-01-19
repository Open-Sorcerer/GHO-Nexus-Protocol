// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {Balance} from "./Balance.sol";

contract BalanceDestination is CCIPReceiver {
    Balance balance;

    /**
     *
     * @param _router Address of the CCIP Router contract
     * @param _balance address of the balance contract
     */
    constructor(address _router, address _balance) CCIPReceiver(_router) {
        balance = Balance(_balance);
    }

    function _ccipReceive(
        Client.Any2EVMMessage memory message
    ) internal override {
        (bool success, ) = address(balance).call(message.data);
        require(success);
    }
}
