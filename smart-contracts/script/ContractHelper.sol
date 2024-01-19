// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract ContractHelper {
    // Supported Networks
    enum SupportedNetworks {
        ETHEREUM_SEPOLIA,
        OPTIMISM_GOERLI,
        AVALANCHE_FUJI,
        ARBITRUM_SEPOLIA,
        POLYGON_MUMBAI,
        BNB_CHAIN_TESTNET,
        BASE_GOERLI
    }

    mapping(SupportedNetworks enumValue => string humanReadableName)
        public networks;

    // Source Contract Addresses
    address constant sepoliaSourceContractAddr =
        0x40541651b8Ad61e0BF60Daf20B924b21499AB7F1;

    constructor() {
        networks[SupportedNetworks.ETHEREUM_SEPOLIA] = "Ethereum Sepolia";
        networks[SupportedNetworks.OPTIMISM_GOERLI] = "Optimism Goerli";
        networks[SupportedNetworks.AVALANCHE_FUJI] = "Avalanche Fuji";
        networks[SupportedNetworks.ARBITRUM_SEPOLIA] = "Arbitrum Sepolia";
        networks[SupportedNetworks.POLYGON_MUMBAI] = "Polygon Mumbai";
        networks[SupportedNetworks.BNB_CHAIN_TESTNET] = "BNB Chain Testnet";
        networks[SupportedNetworks.BASE_GOERLI] = "Base Goerli";
    }

    function getContractAddresses(
        SupportedNetworks network
    ) internal pure returns (address sourceContract) {
        if (network == SupportedNetworks.ETHEREUM_SEPOLIA) {
            return (sepoliaSourceContractAddr);
        }
    }
}
