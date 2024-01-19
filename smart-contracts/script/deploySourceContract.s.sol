// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Script.sol";
import "./Helper.sol";
import {SourceContract} from "../src/SourceContract.sol";

contract DeploySourceContract is Script, Helper {
    function run(SupportedNetworks network) external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address owner = 0xB9f9Af07fAd74C23F35CAeC708515782a15911Ba;
        vm.startBroadcast(deployerPrivateKey);

        (address router, address linkToken, , ,) = getConfigFromNetwork(network);

        SourceContract sourceContract = new SourceContract(
            owner,
            router,
            linkToken
        );

        console.log(
            "SourceContract contract deployed on ",
            networks[network],
            "with address: ",
            address(sourceContract)
        );

        vm.stopBroadcast();
    }
}

// forge script ./script/deploySourceContract.s.sol:DeploySourceContract -vvv --broadcast --rpc-url ethereumSepolia --sig "run(uint8)" -- 0

