const hre = require("hardhat");

const EP_Adress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const sender = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const sender2 = "0xa16E02E87b7454126E5E10d957A927A7F5B5d2be";
async function main() {
    const entryPoint = await hre.ethers.getContractAt("EntryPoint", EP_Adress);
    await entryPoint.depositTo(sender2, { value: hre.ethers.parseEther("100") });

    const balance = await hre.ethers.provider.getBalance(sender2);
    console.log(balance.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode(1);
});
