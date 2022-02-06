const { expect } = require("chai");
const { ethers } = require("hardhat");


function tokens(val) {
  return ethers.utils.parseEther(val);
}

function format(n) {
  return ethers.utils.formatEther(n);
}

describe("uescase Tests", function () {

  let escrowContract;
  let bondContract;
  let legalFundContract;

    let admin;
    let user;
    let legalMember1;
    let legalMember2;
    let address;

    beforeEach(async () => {

    const bondNft = await ethers.getContractFactory("BondNft");
    bondContract = await bondNft.deploy("BONDNFT", "BNFT");

    const legalFund = await ethers.getContractFactory("LegalFund");
    legalFundContract = await legalFund.deploy();

    const escrow = await ethers.getContractFactory("Escrow");
    escrowContract = await escrow.deploy("Escrow",bondContract.address,legalFundContract.address );

    [admin, user, legalMember1,legalMember2, ...address] = await ethers.getSigners();

      
  })

  it("Doc verification successful and failure scenarios", async function () {

    let storageUri = "sampleStorageUri";
    let msgValue = tokens("0.5");

    console.log(storageUri,legalMember1.address,  msgValue);
    console.log(escrowContract.address,bondContract.address,  legalFundContract.address);

    // const transactionHash = await admin.sendTransaction({
    //   to: escrowContract.address,
    //   value: ethers.utils.parseEther("1.0"), // Sends exactly 1.0 ether
    // });
    bondContract.addLegalRole(legalMember1.address);
    await escrowContract.connect(user).createABond(storageUri,legalMember1.address, {value:msgValue});
    let bondDetails = await bondContract.getAllBonds(1,1)
    let nftId =parseInt(bondDetails[0].bondId);
    let userAddress = await bondContract.connect(user).ownerOf(nftId);
    let userStorageUri = await bondContract.connect(user).tokenURI(nftId);
    let legalMemberBalance = await legalFundContract.connect(legalMember1).legalBalance(legalMember1.address);

    let hashedVersionOfDoc = "0xab9876ab";
    
    let newStorageUri = "updatedStrogeUri";
    await bondContract.connect(legalMember1).updateABond(nftId, hashedVersionOfDoc, newStorageUri);

    //sucess flow
    let docVerifiedStatus = await bondContract.connect(user).verifyBond(nftId, hashedVersionOfDoc);
    expect(docVerifiedStatus).to.equal(true);

    //failure flow
    let forgedhashVersionOfDoc = "0xfd9876fd";
    try{
     docVerifiedStatus = await bondContract.connect(user).verifyBond(nftId, forgedhashVersionOfDoc);
    }
    catch(ex){

      console.error(ex.message.toString());
      expect(ex.message.toString().indexOf('Invalid doc')>-1).to.equal(true);
    }

    let newUserStorageUri = await bondContract.connect(user).tokenURI(nftId);
    let bondCount = await bondContract.getTotalBondCount();

    console.log("bondcount :",bondCount);
    expect(bondCount).to.equal(1);
    expect(userAddress).to.equal(user.address);
    expect(userStorageUri).to.equal(storageUri);
    expect(format(legalMemberBalance)).to.equal("0.5");
    expect(newUserStorageUri).to.equal(newStorageUri);

  });
});