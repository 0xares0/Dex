// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  // Deploy the Token Contract
  const tokenContract = await hre.ethers.deployContract("Tokenn");
  await tokenContract.waitForDeployment();
  console.log("Token deployed to:", tokenContract.target);

  //Deploy the exchange contract
  const Dexcontract = await hre.ethers.deployContract("Dex", [
    tokenContract.target,
  ]);

  await Dexcontract.waitForDeployment();
  console.log("Exchange deployed to:", Dexcontract.target);
  
  //Wait for 30 seconds to let Etherscan catch up on contract deployments
  await sleep(30 * 1000);

  // Verify the contracts on Etherscan
  await hre.run("verify:verify", {
    address: tokenContract.target,
    constructorArguments: [],
    contract: "contracts/Tokenn.sol:Tokenn"
  });

  await hre.run("verify:verify", {
    address: Dexcontract.target,
    constructorArguments: [tokenContract.target],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
