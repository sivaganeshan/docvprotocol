# DocV Protocol
 A blockchain-based workflow for institutions(legal, colleges like institutions) and lawyers for any document(certificates, attestations, legal affidavit you name it) creation and verification flow. All the payments and fees are transacted on-chain based on document creation to verification flows.
 
### Existing Problem and Solution:
 
Currently, All the legal or any document of importance creation to verification workflow happens manually. The paper-based record-keeping mechanism, even makes it more time consuming for new document creation, storage and verification.

We propose a solution for all legal entities or independent lawyers or any institution that wants to create a document of importance, Can use our workflows. All the document creation and record keeping happen digitally (in IPFS) and Document hash is tied to Blockchain smart contract. With this workflow, all the document creation, record keeping and verification happen via blockchain proofs.

We wanted to fully utilise the immutable nature of blockchain and the low transaction fee of polygon technology.


### How It's Made

When a user requests a legal affidavit, they will fill up the form with their information from the user portal. They will choose a legal rep from the provided list of legal entity reps.  Once they have filled the form and submitted it,  a BondNFT is created and the required fee is also transferred to the legal rep. All the user filled details are stored in IPFS and tied to the NFT. These transactions are executed by Escrow contract and then the fee is transferred to the legal fund contract. 

Now a registered legal rep can now review the bond request and then can prepare the necessary documentation and then submit it. The legal document is first stored in IPFS, the storage URI and hash of the document is then sent to the BondNft smart contract. 

Now, these documents can be verified anywhere from anywhere in the world. On our provided verification page, the provided document can be tested along with the document id (NFT id) and the smart contract will check and determine if the document is valid. 

We used Polygon Mumbai Testnet as our main blockchain backend. Following are the contracts deployed.
BondNFT: 0xF7E2401071dA80D48c602670e1a60F85fAD10989
Escrow: 0xA59e4711734361aE4932EbA7D02ee9Ebef940CC6
LegalFund: 0xf6b448ab602ED43F047D8434da7b12F7E8cf65fe

The Tech stack we used are:
Frontend: Angular 13, HTML, Scss, Bootstrap
Backend: Solidity, Hardhat, Web3.js, ether.js 
File Storage: IPFS
Encryption: Crypto.js




