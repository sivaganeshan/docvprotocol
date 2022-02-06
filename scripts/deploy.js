const fs = require('fs');
const path = require('path');

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