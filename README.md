# DocV Protocol
 A blockchain-based workflow for institutions and independentn lawyers for any document(certificates, attestations, legal affidavit you name it) creation to verification flow. All the payments and fees are transacted on-chain based on documentwork flow stage.
 
### Existing Problem and Solution:
 
Currently, All the legal or any document of importance creation to verification workflow happens manually. The paper-based record-keeping mechanism makes the overall process even more time consuming.

All institutions can use our workflows for fully digitalised and forever present blockchain solution. All the document creation, record keeping happens digitally (in IPFS) and Document hash is tied to Blockchain smart contract. 

We wanted to fully utilise the immutable nature of blockchain and the low transaction fee of polygon technology.


### How It's Made

When a user requests a legal affidavit, they will fill up the form with their information (from the user portal). They will choose a legal rep from the provided list of legal entity.  Once they submitt the form ,  a BondNFT is created and the required fee is also transferred to the legal rep. All the user filled details are stored in IPFS and tied to the NFT. These transactions are executed by Escrow contract and then the fee is transferred to the legal fund contract. 

Now a registered legal rep can now review the document request and then can prepare the necessary documentation. The legal document is first stored in IPFS, the storage URI and hash of the document is then sent to the BondNft smart contract. 

Now, these documents can be verified from anywhere in the world, On our provided verification page, the provided document can be tested along with the document id (NFT id). The smart contract will check and determine the provided document is valid. 

We used Polygon Mumbai Testnet as our main blockchain backend. Following are the contracts deployed.

BondNFT: 0xF7E2401071dA80D48c602670e1a60F85fAD10989

Escrow: 0xA59e4711734361aE4932EbA7D02ee9Ebef940CC6

LegalFund: 0xf6b448ab602ED43F047D8434da7b12F7E8cf65fe


The Tech stack we used :

Frontend: Angular 13, HTML, Scss, Bootstrap

Backend: Solidity, Hardhat, Web3.js, ether.js 

File Storage: IPFS

Encryption: Crypto.js




