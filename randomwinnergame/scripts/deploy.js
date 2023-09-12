const hre = require("hardhat");
const {
  FEE,
  VRF_COORDINATOR,
  LINK_TOKEN,
  KEY_HASH,
} = require("../constants/index");
const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  const randomWinner = await hre.ethers.deployContract("RandomWinnerGame", [
    VRF_COORDINATOR,
    LINK_TOKEN,
    KEY_HASH,
    FEE,
  ]);

  await randomWinner.waitForDeployment();

  console.log("Verify Contract Address:", randomWinner.target);

  console.log("Sleeping.....");
  await sleep(30000);

  await hre.run("verify:verify", {
    address: randomWinner.target,
    constructorArguments: [VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE],
  });

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}


main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});