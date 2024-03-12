const hre = require("hardhat");

async function paymasterDeposit(paymaster) {
    const [deployer] = await hre.ethers.getSigners();

    const contractAddress = paymaster;
    console.log("contract address:", contractAddress);
    const contract = await hre.ethers.getContractAt("Paymaster", contractAddress);
    const amountToSend = hre.ethers.parseEther("100");
    const tx = await deployer.sendTransaction({
        to: contractAddress,
        value: amountToSend,
    });

    await tx.wait();

    console.log("ETH sent to contract address:", contractAddress);
    const balance = await hre.ethers.provider.getBalance(contractAddress);
    console.log(balance.toString());
}

paymasterDeposit()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
