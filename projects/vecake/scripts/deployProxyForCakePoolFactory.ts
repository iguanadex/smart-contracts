import { parseEther } from "ethers/lib/utils";
import { ethers, network, run } from "hardhat";
import { writeFileSync } from "fs";
import config from "../config";

const main = async () => {
  // Get network data from Hardhat config (see hardhat.config.ts).
  const networkName = network.name;

  // Check if the network is supported.
  if (networkName === "etherlinkTestnet" || networkName === "etherlink") {
    console.log(`Deploying to ${networkName} network...`);

    // Compile contracts.
    await run("compile");
    console.log("Compiled contracts...");

    // Deploy contracts.
    const ProxyForCakePoolFactoryContract = await ethers.getContractFactory("ProxyForCakePoolFactory");
    const contract = await ProxyForCakePoolFactoryContract.deploy();

    // Wait for the contract to be deployed before exiting the script.
    await contract.deployed();
    console.log(`Deployed to ${contract.address}`);

    const contracts = {
      ProxyForCakePoolFactory: contract.address,
      veCAKE: "0x",
    };

    writeFileSync(`./data/deployments/${networkName}.json`, JSON.stringify(contracts, null, 2));
  } else {
    console.log(`!! Deploying to ${networkName} network is not supported !!`);
  }
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
