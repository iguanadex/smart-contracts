import { network, ethers } from "hardhat";
import { verifyContract } from "../../exchange-protocol/packages/common/verify";
import { sleep } from "../../exchange-protocol/packages/common/sleep";
import config from "../config";

async function main() {
  const networkName = network.name;
  const deployedContracts = await import(`../data/deployments/${networkName}.json`);

  const [deployer] = await ethers.getSigners();

  // Verify PancakeFactory
  console.log("Verifying ProxyForCakePoolFactory contract..");

  await verifyContract(deployedContracts.VECake, [
    config.CakePool[networkName],
    config.CakeToken[networkName],
    config.ProxyForCakePoolFactory[networkName],
  ]);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
