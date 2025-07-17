# DocV Protocol
 A blockchain-based workflow for institutions and independent lawyers for any document(certificates, attestations, legal affidavit, you name it) creation to verification flow. All the payments and fees are transacted on-chain based on the document flow stage.
 
### Existing Problem and Solution:
 
Currently, all legal or important document creation and verification workflows are handled manually. The paper-based record-keeping mechanism makes the overall process even more time-consuming.

All institutions can utilise our workflows for a fully digitalised and permanently present blockchain solution. All document creation and record-keeping occur digitally (in IPFS), and the document hash is tied to a Blockchain smart contract. 

We wanted to fully utilise the immutable nature of blockchain and the low transaction fee of Polygon technology.


### How It's Made

When a user requests a legal affidavit, they will fill out the form with their information (from the user portal). They will choose a legal rep from the provided list of legal entities.  Once they submit the form,  a BondNFT is created, and the required fee is also transferred to the legal representative. All the user-filled details are stored in IPFS and tied to the NFT. These transactions are executed by an Escrow contract, and then the fee is transferred to the legal fund contract. 

Now a registered legal rep can review the document request and then prepare the necessary documentation. The legal document is first stored in IPFS, the storage URI and hash of the document are then sent to the BondNft smart contract. 

Now, these documents can be verified from anywhere in the world, On our provided verification page, the provided document can be tested along with the document ID (NFT id). The smart contract will check and determine whether the provided document is valid. 

We used Polygon Mumbai Testnet as our main blockchain backend. The following are the contracts deployed.

BondNFT: 0xF7E2401071dA80D48c602670e1a60F85fAD10989

Escrow: 0xA59e4711734361aE4932EbA7D02ee9Ebef940CC6

LegalFund: 0xf6b448ab602ED43F047D8434da7b12F7E8cf65fe


The Tech stack we used :

Frontend: Angular 13, HTML, Scss, Bootstrap

Backend: Solidity, Hardhat, Web3.js, ether.js 

File Storage: IPFS

Encryption: Crypto.js




