const { expect } = require("chai");
const { ethers } = require("hardhat");


function tokens(val) {
  return ethers.utils.parseEther(val);
}

function format(n) {
  return ethers.utils.formatEther(n);
}

describe("use case tests", function () {

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

  it("Create a Bond and verify the owner and storageURI", async function () {

    let storageUri = "sampleStorageUri";
    let msgValue = tokens("0.5");

    console.log(storageUri,legalMember1.address,  msgValue);
    console.log(escrowContract.address,bondContract.address,  legalFundContract.address);

    // const transactionHash = await admin.sendTransaction({
    //   to: escrowContract.address,
    //   value: ethers.utils.parseEther("1.0"), // Sends exactly 1.0 ether
    // });

    await escrowContract.connect(user).createABond(storageUri,legalMember1.address, {value:msgValue});
   let nftId =1;
    let userAddress = await bondContract.connect(user).ownerOf(nftId);
    let userStorageUri = await bondContract.connect(user).tokenURI(nftId);
    let legalMemberBalance = await legalFundContract.connect(legalMember1).legalBalance(legalMember1.address);

    expect(userAddress).to.equal(user.address);
    expect(userStorageUri).to.equal(storageUri);
    expect(format(legalMemberBalance)).to.equal("0.5");

  });
});