import { parseEther } from "ethers/lib/utils";
import { ethers, network, run } from "hardhat";
import { writeFileSync } from "fs";
import config from "../config";

const main = async () => {
  // Get network data from Hardhat config (see hardhat.config.ts).
  const networkName = network.name;
  const deployedContracts = await import(`../data/deployments/${networkName}.json`);

  // Check if the network is supported.
  if (networkName === "etherlinkTestnet" || networkName === "etherlink") {
    console.log(`Deploying to ${networkName} network...`);

    // Check if the addresses in the config are set.
    if (
      config.CakePool[networkName] === ethers.constants.AddressZero ||
      config.CakeToken[networkName] === ethers.constants.AddressZero ||
      config.ProxyForCakePoolFactory[networkName] === ethers.constants.AddressZero
    ) {
      throw new Error("Missing addresses");
    }

    // Compile contracts.
    await run("compile");
    console.log("Compiled contracts...");

    // Deploy contracts.
    const VECakeContract = await ethers.getContractFactory("VECake");
    const contract = await VECakeContract.deploy(
      config.CakePool[networkName],
      config.CakeToken[networkName],
      config.ProxyForCakePoolFactory[networkName]
    );

    // Wait for the contract to be deployed before exiting the script.
    await contract.deployed();
    console.log(`Deployed to ${contract.address}`);

    const contracts = {
      ProxyForCakePoolFactory: deployedContracts.ProxyForCakePoolFactory,
      VECake: contract.address,
    };

    writeFileSync(`./data/deployments/${networkName}.json`, JSON.stringify(contracts, null, 2));
  } else {
    console.log(`Deploying to ${networkName} network is not supported...`);
  }
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
