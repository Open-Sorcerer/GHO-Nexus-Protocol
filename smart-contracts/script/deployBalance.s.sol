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

// forge script ./script/deployBalance.s.sol:DeployBalance -vvv --broadcast --rpc-url ethereumSepolia --sig "run(uint8)" -- 0

// forge verify-contract --etherscan-api-key MGE9XWX9ISUPSDHFWP6MDB2W4A48J9V35P  0x1FB29E8c8AE352C7eccEA326d569a3E5C5C0e7C8 ./src/Balance.sol:Balance --chain 11155111 --constructor-args $(cast abi-encode "constructor(address,address,address)" "0xB9f9Af07fAd74C23F35CAeC708515782a15911Ba" "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59" "0x779877A7B0D9E8603169DdbD7836e478b4624789")

// forge verify-contract --etherscan-api-key MGE9XWX9ISUPSDHFWP6MDB2W4A48J9V35P  0x1FB29E8c8AE352C7eccEA326d569a3E5C5C0e7C8 src/Balance.sol:Balance --chain 11155111 --watch --constructor-args $(cast abi-encode "constructor(address,address,address)" "0xB9f9Af07fAd74C23F35CAeC708515782a15911Ba" "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59" "0x779877A7B0D9E8603169DdbD7836e478b4624789")

// forge verify-contract --etherscan-api-key MGE9XWX9ISUPSDHFWP6MDB2W4A48J9V35P  0x1FB29E8c8AE352C7eccEA326d569a3E5C5C0e7C8 src/Balance.sol:Balance --chain 11155111 --watch --constructor-args $(cast abi-encode "constructor(address,address,address)" "0xB9f9Af07fAd74C23F35CAeC708515782a15911Ba" "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59" "0x779877A7B0D9E8603169DdbD7836e478b4624789") --libraries "Library1:0x123...,Library2:0x456..."

// Replace Library1:0x123...,Library2:0x456... with your library names and their corresponding addresses.
