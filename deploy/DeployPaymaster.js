module.exports = async ({ getNamedAccounts, depoyments }) => {
    const { deployer } = await getNamedAccounts();
    const { deploy, log } = deployments;

    console.log("----------------------------------------");

    const paymaster = await deploy("Paymaster", {
        from: deployer,
        args: [],
        log: true,
    });

    console.log("--------------------------------------------");
};

module.exports.tags = ["all", "paymaster"];
