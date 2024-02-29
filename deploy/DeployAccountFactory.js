const hre = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    // const waitBlockConfirmations = developmentChains.includes(network.name)
    //     ? 1
    //     : VERIFICATION_BLOCK_CONFIRMATIONS;

    log("-------------------------------------------");

    const arguments = [];
    const accountFactory = await deploy("AccountFactory", {
        from: deployer,
        args: arguments,
        log: true,
        // waitConfirmations: waitBlockConfirmations,
    });
    // if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    //     log("Verifying...");
    //     await verify(accountFactory.address, arguments);
    //     log("Verified!");
    // }
    log("----------------------------------------------------");
};

module.exports.tags = ["all", "accountFactory"];

// note:
// hh run scripts/DeployAccountAbstraction.js --network localhost
// or
// hh node
// deploying contract on localhost

// account factory address: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 on localhost
