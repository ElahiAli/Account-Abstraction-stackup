const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

const poolContractAddress = "0x06Ada51C0759B65fdbBc5D3305DF563C5fc6329E";
const kipTokenAddress = "0x01907E8215e48809E1E06083294fCb5FC74296f5";

async function deploy() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const accountAbstraction = await ethers.deployContract("AccountAbstraction", [
        poolContractAddress,
        kipTokenAddress,
    ]);

    console.log("accountAbstraction address:", await accountAbstraction.getAddress());

    log("-------------------------------------------");

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        console.log("Verifying...");
        await verify(accountAbstraction.address, arguments);
        console.log("Verified!");
    }
    log("----------------------------------------------------");
}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
