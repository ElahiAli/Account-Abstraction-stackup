console.log("0");

const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");
console.log("0.2");
module.exports = async function ({ deployments, getNamedAccounts }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    console.log("1");
    const args = [];

    const kipToken = await deploy("KipMock", {
        from: deployer,
        log: true,
        args: args,
    });
    console.log("2");

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(kipToken.address, args);
    }
    log("Deployed.");
    log("contract address: ", kipToken.address);
    log("-----------------------------------------------------------");
};

module.exports.tags = ["all", "kipToken", "main"];
