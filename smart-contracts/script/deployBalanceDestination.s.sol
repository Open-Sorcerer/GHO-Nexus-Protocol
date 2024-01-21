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


// forge verify-contract --etherscan-api-key MGE9XWX9ISUPSDHFWP6MDB2W4A48J9V35P  0xf3b1Db4c26be30a420286C66f39524d3aA1F4B96 ./src/BalanceDestination.sol:BalanceDestination --chain 11155111 --constructor-args $(cast abi-encode "constructor(address,address)" "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59" "0xa6d5194686b1468CaF4ECC5dBE83E8C30C547942")

