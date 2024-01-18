// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {SourceContract} from "./SourceContract.sol";

contract SourceGateway is CCIPReceiver {
    SourceContract sourceContract;

    /**
     *
     * @param _router Address of the CCIP Router contract
     * @param _sourceContract address of the sourceContract contract
     */
    constructor(
        address _router,
        address _sourceContract
    ) CCIPReceiver(_router) {
        sourceContract = SourceContract(_sourceContract);
    }

    function _ccipReceive(
        Client.Any2EVMMessage memory message
    ) internal override {
        (bool success, ) = address(sourceContract).call(message.data);
        require(success);
    }
}
