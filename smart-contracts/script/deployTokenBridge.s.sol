// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Script.sol";
import "./Helper.sol";
import {TokenBridge} from "../src/TokenBridge.sol";

contract DeployTokenBridge is Script, Helper {
    function run(SupportedNetworks network) external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        (address router, address linkToken, , , , ) = getConfigFromNetwork(
            network
        );

        TokenBridge tokenBridge = new TokenBridge(router, linkToken);

        console.log(
            "TokenBridge contract deployed on ",
            networks[network],
            "with address: ",
            address(tokenBridge)
        );

        vm.stopBroadcast();
    }
}

// forge script ./script/deployTokenBridge.s.sol:DeployTokenBridge -vvv --broadcast --rpc-url ethereumSepolia --sig "run(uint8)" -- 0

// forge script ./script/deployTokenBridge.s.sol:DeployTokenBridge -vvv --broadcast --rpc-url arbitrumSepolia --sig "run(uint8)" -- 3 
