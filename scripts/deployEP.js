const hre = require("hardhat");

async function main() {
    const epContract = await hre.ethers.deployContract("EntryPoint");

    await epContract.waitForDeployment();

    console.log(`deployed to ${epContract.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// hh run scripts/depoyEp.js --network localhost
// deploying contract on localhost
