const hre = require("hardhat");
const appOwner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const modelOwner = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const dataOwner = "0x90F79bf6EB2c4f870365E785982E1f101E93b906";
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    // const waitBlockConfirmations = developmentChains.includes(network.name)
    //     ? 1
    //     : VERIFICATION_BLOCK_CONFIRMATIONS;

    log("-------------------------------------------");

    const arguments = [];
    const accountAbstraction = await deploy("AccountAbstraction", {
        from: deployer,
        args: arguments,
        log: true,
        // waitConfirmations: waitBlockConfirmations,
    });
    // if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    //     log("Verifying...");
    //     await verify(accountAbstraction.address, arguments);
    //     log("Verified!");
    // }
    log("----------------------------------------------------");
};

module.exports.tags = ["all", "accountAbstraction"];

// note:
// hh run scripts/DeployAccountAbstraction.js --network localhost
// or
// hh node
// deploying contract on localhost

// account factory address: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 on localhost
