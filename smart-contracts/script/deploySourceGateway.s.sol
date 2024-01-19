// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Script.sol";
import "./Helper.sol";
import {SourceGateway} from "../src/SourceGateway.sol";
import "./ContractHelper.sol";

contract DeploySourceGateway is Script, Helper {
    function run(SupportedNetworks network) external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        (address router, , , , address sourceContract) = getConfigFromNetwork(
            network
        );

        SourceGateway sourceGateway = new SourceGateway(router, sourceContract);

        console.log(
            "SourceGateway contract deployed on ",
            networks[network],
            "with address: ",
            address(sourceGateway)
        );

        vm.stopBroadcast();
    }
}

// forge script ./script/deploySourceGateway.s.sol:DeploySourceGateway -vvv --broadcast --rpc-url ethereumSepolia --sig "run(uint8)" -- 0
