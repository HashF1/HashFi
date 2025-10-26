const hre = require("hardhat");

async function main() {
  
  const YieldPassport = await hre.ethers.getContractFactory("YieldPassport");

  
  const initialAttesters = ["0x28dbf68b2f778f19eff0ef7288caac8538bb5639"];

  console.log("Deploying YieldPassport contract...");

  
  const yieldPassport = await YieldPassport.deploy(initialAttesters);

 
  await yieldPassport.deployed();

  console.log(`YieldPassport deployed successfully!`);
  console.log(`Contract Address: ${yieldPassport.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
