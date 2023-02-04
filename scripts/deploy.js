// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const {hre, run, network} = require("hardhat");

async function main() {
 const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
 console.log("Deploying contract...");
 const simpleStorage = await SimpleStorageFactory.deploy()
 await simpleStorage.deployed()
 console.log(`deployed contract to : ${simpleStorage.address}`)
 //only veriify when we are on georly
 if( network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
  await simpleStorage.deployTransaction.wait(6)
   await verify(SimpleStorage.address, [])

 }

 const currentValue = await simpleStorage.retrieve()
 console.log( `current value is :${currentValue}`)

 //update the current value
 const transactionResponse = await simpleStorage.store(7)
 await transactionResponse.wait(1)
 const updatedValue = await simpleStorage.retrieve()
 console.log(` updatedValue is: ${updatedValue}`)

}

async function verify (contractAddress, args) {

console.log('verifying contract ...')
try {
  await run("verify:verify", {
    address: contractAddress,
    constructorArguments: args,
  })

}catch (e) {
if(e.message.toLowerCase().includes("already verified")) {
  console.log("Already verified")
} else {
console.log(e)
}

}



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
