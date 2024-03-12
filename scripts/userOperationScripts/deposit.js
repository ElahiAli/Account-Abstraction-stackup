const hre = require("hardhat");

const EP_Adress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const sender = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const sender2 = "0xa16E02E87b7454126E5E10d957A927A7F5B5d2be";
const paymaster = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
async function main() {
    const entryPoint = await hre.ethers.getContractAt("EntryPoint", EP_Adress);
    await entryPoint.depositTo(EP_Adress, { value: hre.ethers.parseEther("100") });

    const balance = await hre.ethers.provider.getBalance(EP_Adress);
    console.log(balance.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode(1);
});
