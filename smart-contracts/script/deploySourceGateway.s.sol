// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Script.sol";
import "./Helper.sol";
import {SourceGateway} from "../src/SourceGateway.sol";

contract DeploySourceGateway is Script, Helper {
    function run(SupportedNetworks network) external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        (address router, , , , address sourceContract,) = getConfigFromNetwork(
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

// forge script ./script/deploySourceGateway.s.sol:DeploySourceGateway -vvv --broadcast --rpc-url ethereumSepolia --sig "run(uint8)" -- 3

// forge verify-contract --etherscan-api-key MGE9XWX9ISUPSDHFWP6MDB2W4A48J9V35P  0x41CD49f1Fb38b07E072a9C815c629A7A48b18061 ./src/BalanceDestination.sol:BalanceDestination --chain 11155111 --constructor-args $(cast abi-encode "constructor(address,address)" "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59" "0x1FB29E8c8AE352C7eccEA326d569a3E5C5C0e7C8")
