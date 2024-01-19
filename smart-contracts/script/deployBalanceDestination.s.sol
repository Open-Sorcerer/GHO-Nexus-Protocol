// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Script.sol";
import "./Helper.sol";
import {BalanceDestination} from "../src/BalanceDestination.sol";

contract DeployBalanceDestination is Script, Helper {
    function run(SupportedNetworks network) external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        (address router, , , , , address balanceContact) = getConfigFromNetwork(
            network
        );

        BalanceDestination balanceDestination = new BalanceDestination(
            router,
            balanceContact
        );

        console.log(
            "BalanceDestination contract deployed on ",
            networks[network],
            "with address: ",
            address(balanceDestination)
        );

        vm.stopBroadcast();
    }
}

// forge script ./script/deployBalanceDestination.s.sol:DeployBalanceDestination -vvv --broadcast --rpc-url ethereumSepolia --sig "run(uint8)" -- 0
