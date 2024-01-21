# GHO Nexus Protocol
## Interchain Credit System Leveraging GHO and Chainlink CCIP

Welcome to GHO Nexus Protocol – a cutting-edge DeFi lending and borrowing platform designed for the new era of cryptocurrency. Our platform facilitates the efficient management of digital assets across multiple blockchain networks, offering a unique, seamless experience. GHO Nexus Protocol is also the First GHO Bridge and lending and Borrowing Protocol.

## Comprehensive Lending and Borrowing Ecosystem
GHO Nexus Protocol transcends a typical platform; it's an ecosystem enabling users to lend and borrow digital assets like GHO and Ethereum (ETH) across various blockchains. This feature enhances the liquidity and utility of your digital holdings.

- **Cross-Chain Functionality**: Facilitate lending and borrowing of GHO and ETH across numerous blockchains.
- **Diverse Borrowing Options**: Whether you want to lend ETH and borrow GHO or vice versa, our platform supports both intra-chain and cross-chain transactions to meet your financial needs.

## Accuracy Powered by Chainlink Data Feeds
For precise and reliable transaction processing, GHO Nexus Protocol integrates Chainlink Data Feeds. This integration ensures real-time USD valuations of ETH, providing you the confidence to borrow GHO against your ETH holdings on any blockchain.

## First GHO Bridge
Expanding beyond lending and borrowing, our dApp introduces an advanced bridge feature for GHO tokens, streamlining their transfer across blockchains.

- **Extended Capabilities**: Our bridge isn't limited to GHO; it also facilitates the transfer of BnM mints across different blockchains.
- **User-Centric Design**: We prioritize a frictionless user experience, covering all gas fees for token bridging to ensure smooth transactions.

## Flexible Transaction Options
Our platform caters to a wide array of users and scenarios:

- **Sender Options**:
  - Externally Owned Account (EOA) Address
  - Smart Contract
- **Receiver Options**:
  - Externally Owned Account (EOA) Address
  - Smart Contract

Join GHO Nexus Protocol and explore the vast potential of DeFi. Bridge the blockchain divide and revolutionize digital asset management!

# Smart Contract Architecture

## GHO Bridge
Users can interact with our dApp, select their desired destination blockchain, and specify the EOA or smart contract address for token transfer. Leveraging Chainlink CCIP, we facilitate the transfer of GHO and BnM tokens. Like any ERC20 token, users must approve the token, and our dApp streamlines this process. TokenBridge.sol is used for Bridging.

![WhatsApp Image 2024-01-21 at 20 09 44_05c9b909](https://github.com/Open-Sorcerer/GHOtela/assets/60979345/bedbee17-1555-49d4-8f0d-b8ba07cd40e0)

![WhatsApp Image 2024-01-21 at 20 09 00_0a351bec](https://github.com/Open-Sorcerer/GHOtela/assets/60979345/a87246a1-26e7-42e8-857c-cb1e8cc33246)



## Lending and Borrowing Protocol
Our protocol involves four key smart contracts:
- "SourceContract" on Arbitrum Sepolia and Ethereum Sepolia (Source Chains)
- "Balance" Contract on Ethereum Sepolia (Destination Chain)
- "SourceGateway" Contract on Arbitrum with a _ccipReceive function for Source chain communication
- "BalanceDestination" Contract on Ethereum Sepolia (Destination Chain)

## Lend
Users deposit tokens into `SourceContract`, which, through Chainlink CCIP, transfers message data to the `Balance` contract via the `BalanceDestination` contract. We ensure users cannot borrow more than 80% of their lending amount. BnM tokens are integrated and valued in USD using Chainlink Data Feeds.

![WhatsApp Image 2024-01-21 at 20 10 22_89cf60d7](https://github.com/Open-Sorcerer/GHOtela/assets/60979345/08931c9d-c267-4a5e-a24a-18b6beab289d)



## Borrow
Users can borrow up to 80% of their lending amount in any token. The borrowing process involves the `SourceContract` and Chainlink CCIP, with the `Balance` contract verifying eligibility and instructing `SourceContract` via `SourceGateway` to disburse funds.

![WhatsApp Image 2024-01-21 at 20 11 32_e45676f4](https://github.com/Open-Sorcerer/GHOtela/assets/60979345/faedf067-0ed1-4135-b474-7d8082d9d157)


# Smart Contract Addresses

## GHO Bridge
TokenBridge contract deployed on Ethereum Sepolia with address:  0xfb4F2aed17a466f78587612751c0d21d4755BF57

[CCIP Explorer link 0xfb4F2aed17a466f78587612751c0d21d4755BF57](https://ccip.chain.link/address/0xfb4f2aed17a466f78587612751c0d21d4755bf57)

TokenBridge contract deployed on Arbritium Sepolia with address: 0xaB0Ce2237830Ad713b3134e5307521f20E1C0ff6

[CCIP Explorer link 0xaB0Ce2237830Ad713b3134e5307521f20E1C0ff6](https://ccip.chain.link/address/0xab0ce2237830ad713b3134e5307521f20e1c0ff6)

## Lending and Borrowing
SourceContract contract deployed on Arbitrum Sepolia with address: 0x980600E1ADA72f86d332Fb76D34D590c4Fa4BC1C

[CCIP Explorer link 0x980600E1ADA72f86d332Fb76D34D590c4Fa4BC1C](https://ccip.chain.link/address/0x980600e1ada72f86d332fb76d34d590c4fa4bc1c)

SourceGateway contract deployed on Arbitrum Sepolia with address: 0x6bd9a5bc3e13cFcEB36776e601009c1c51FEF060

SourceContract contract deployed on Ethereum Sepolia with address:  0xA2e6cf09DE7acedd4329eaE1F25D0Eb5478949C1

SourceGateway contract deployed on  Ethereum Sepolia with address:  0xA92Fc4369E52e5ae251C86604bd1fDdF122ccD2c

Balance contract deployed on Ethereum Sepolia with address:  0x1FB29E8c8AE352C7eccEA326d569a3E5C5C0e7C8

BalanceDestination contract deployed on Ethereum Sepolia with address:  0x41CD49f1Fb38b07E072a9C815c629A7A48b18061

## Dapp Screenshots

![WhatsApp Image 2024-01-21 at 22 23 07_64689764](https://github.com/Open-Sorcerer/GHO-Nexus-Protocol/assets/60979345/10f2b067-998a-4cb4-9847-4c259d1bc824)

![WhatsApp Image 2024-01-21 at 22 22 09_cd473155](https://github.com/Open-Sorcerer/GHO-Nexus-Protocol/assets/60979345/de27b6f0-0d4a-424f-b7ce-2f7ab4c1a610)



