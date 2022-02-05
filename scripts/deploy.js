async function main() {
        

    const bondNft = await ethers.getContractFactory("BondNft");
    const bondNftDeployed = await bondNft.deploy("BONDNFT", "BNFT");

    const legalFund = await ethers.getContractFactory("LegalFund");
    const legalFundDeployed = await legalFund.deploy();

    const escrow = await ethers.getContractFactory("Escrow");
    const escrowDeployed = await escrow.deploy("Escrow",bondNftDeployed.address,legalFundDeployed.address );

    console.log(" contract address Of bondNft : ", bondNftDeployed.address);

    console.log(" contract address Of legalFund : ", legalFundDeployed.address);

    console.log(" contract address Of escrow : ", escrowDeployed.address);


  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });