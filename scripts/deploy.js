const fs = require('fs');
const path = require('path');

async function main() {

  const legal1 = '0x2546bcd3c84621e976d8185a91a922ae77ecec30'
  const legal2 = '0xbda5747bfd65f08deb54cb465eb87d40e51b197e'
  const legal3 = '0xdd2fd4581271e230360230f9337d5c0430bf44c0'

    const bondNft = await ethers.getContractFactory("BondNft");
    const bondNftDeployed = await bondNft.deploy("BONDNFT", "BNFT");

    const legalFund = await ethers.getContractFactory("LegalFund");
    const legalFundDeployed = await legalFund.deploy();

    const escrow = await ethers.getContractFactory("Escrow");
    const escrowDeployed = await escrow.deploy("Escrow",bondNftDeployed.address,legalFundDeployed.address );

    const tx = await bondNftDeployed.addLegalRole(legal1);
    const tx2 = await bondNftDeployed.addLegalRole(legal2);
    const tx3 = await bondNftDeployed.addLegalRole(legal3);

    console.log(" contract address Of bondNft : ", bondNftDeployed.address);

    console.log(" contract address Of legalFund : ", legalFundDeployed.address);

    console.log(" contract address Of escrow : ", escrowDeployed.address);

    const envFile = `
      export const environment = {
        production: false,
        bondNftInstance: '${bondNftDeployed.address}',
        legalFundInstance: '${legalFundDeployed.address}',
        escrowInstance: '${escrowDeployed.address}'
      };`
    ;

    const webPath = path.join('.','docVWeb', 'src');
    await fs.promises.writeFile(path.join(webPath, 'environments', 'environment.hardhat.ts'), envFile);
    const artifactsPath = path.join('.', 'artifacts', 'contracts');
    const webAssetPath = path.join(webPath, 'assets');
    const contractsAbiFolders = await fs.promises.readdir(artifactsPath);
    const copying = [];
    for (const folder of contractsAbiFolders) {
      if (!/\.sol$/.test(folder)) continue;
      const contractAbiName = folder.split('.').slice(0, -1).join('.') + '.json';
      copying.push(fs.promises.copyFile(
        path.join(artifactsPath, folder, contractAbiName),
        path.join(webAssetPath, contractAbiName)
      ));
    }
    await Promise.all(copying);

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });