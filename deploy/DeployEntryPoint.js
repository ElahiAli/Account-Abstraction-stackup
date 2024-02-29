const hre = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    // const waitBlockConfirmations = developmentChains.includes(network.name)
    //     ? 1
    //     : VERIFICATION_BLOCK_CONFIRMATIONS;

    log("-------------------------------------------");

    const arguments = [];
    const entryPoint = await deploy("EntryPoint", {
        from: deployer,
        args: arguments,
        log: true,
        // waitConfirmations: waitBlockConfirmations,
    });
    // if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    //     log("Verifying...");
    //     await verify(entryPoint.address, arguments);
    //     log("Verified!");
    // }
    log("----------------------------------------------------");
};

module.exports.tags = ["all", "entryPoint"];

// note:
// hh run scripts/DeployEntryPoint.js --network localhost
// or hh node
// deploying contract on localhost
