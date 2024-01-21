// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Script.sol";
import "./Helper.sol";
import {Balance} from "../src/Balance.sol";

contract DeployBalance is Script, Helper {
    function run(SupportedNetworks network) external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address owner = 0xB9f9Af07fAd74C23F35CAeC708515782a15911Ba;
        vm.startBroadcast(deployerPrivateKey);

        (address router, address linkToken, , , , ) = getConfigFromNetwork(
            network
        );

        Balance balance = new Balance(owner, router, linkToken);

        console.log(
            "Balance contract deployed on ",
            networks[network],
            "with address: ",
            address(balance)
        );

        vm.stopBroadcast();
    }
}


