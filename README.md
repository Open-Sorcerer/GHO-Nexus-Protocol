# GHOtela
## Your Gateway to Cross-Chain DeFi Solutions

Welcome to GHOtela – a revolutionary cross-chain DeFi lending and borrowing platform designed for the modern cryptocurrency user. Our platform offers a seamless experience in managing digital assets across various blockchain networks.

### Lending and Borrowing Platform
GHOtela is not just a platform; it's an ecosystem that empowers users to lend and borrow digital assets across different blockchains. With support for the GHO token and Ethereum (ETH), our protocol enhances the flexibility and reach of your digital assets.

- **Cross-Chain Functionality**: Lend and borrow GHO and ETH tokens across multiple blockchains.
- **Diverse Borrowing Options**: Need to lend ETH and borrow GHO? No problem. Our platform supports intra-chain and cross-chain transactions to suit your needs.

### Enhanced with Chainlink Data Feeds
To ensure accurate and reliable transactions, GHOtela integrates Chainlink Data Feeds. This enables us to provide real-time USD valuation of ETH, ensuring that you can borrow GHO against your ETH holdings with confidence, whether on the same blockchain or across different chains.

### Introducing Our Bridge Feature
GHOtela goes beyond lending and borrowing. Our dApp introduces a robust bridge feature for GHO tokens, facilitating their transfer from one blockchain to another.

- **Extended Functionality**: In addition to GHO, our bridge supports the transfer of BnM mints across various blockchains.
- **User-Friendly Experience**: We understand the importance of a smooth user experience. That's why we cover the gas fees for token bridging, making your transactions hassle-free.

### Flexible Transaction Participants
Our platform is designed to cater to a diverse range of users and scenarios:

- **Sender Options**:
  - Externally Owned Account (EOA) Address
  - Smart Contract
- **Receiver Options**:
  - Externally Owned Account (EOA) Address
  - Smart Contract

Join us at GHOtela, where we bridge the gap between blockchains and open up a world of possibilities in the DeFi space. Experience the future of digital asset management today!

# Smart Contract Archieture

## GHO Bridge

A Gho user can simply interact with our dapp, select the destionation Blockchain, they want to send the Token to and Address of the EOA or smart contract they want to send token to, using chainlink CCIP we will transfer the token, apart from the GHO we also added BnM token.

As any ERC20, user have approve the token, our dapp also take care of that.

![WhatsApp Image 2024-01-21 at 20 09 44_9f4ce0b9](https://github.com/Open-Sorcerer/GHOtela/assets/60979345/f3eaeff2-c7fa-4de3-803c-5a6f16e831e1)

![WhatsApp Image 2024-01-21 at 20 09 00_aab99623](https://github.com/Open-Sorcerer/GHOtela/assets/60979345/161e3f92-318b-4625-9b4e-0a4565498a5f)

## Lending and Borrowing Protocol

Our use case works off of 4 smart contracts
- a "SourceContract" Contract on Arbitrum Sepolia (Source Chain) and Ethereum Sepolia (Source Chain)
- a "Balance" Contract on Ethereum Sepolia (Destination Chain)
- a "SourceGateway" Contract on Arbitrum that has _ccipReceive function for the Source chain
- a "BalanceDestination" Contract on Ethereum Sepolia (Destination Chain) 

A DEFI user deposits a token in SourceContract, and then, using Chainlink CCIP, transfers the message data, to Protocol. The Protocol contract that accepts the deposit. Using that transferred token as collateral, the user (i.e. depositor/borrower - the same EOA as on the source chain) initiates a borrow operation which mints units of the mock stablecoin to lend to the depositor/borrower .

A DEFI user deposits a token in SourceContract, and then, using Chainlink CCIP, transfers the message data, to `Balance` contract 



