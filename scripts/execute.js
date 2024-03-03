const hre = require("hardhat");
// manual nonce only for test
// for deploying different smart account nonce must be increased
const FACTORY_NONCE = 1;

// AcountFactory address in localhost
const FACTORY_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// EntryPoint contract address in localhost
const EP_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// Paymaster contract address in localhost
const PAYMASTER_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

async function main() {
    const entryPoint = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);
    // console.log("entryPoint is fine", entryPoint);

    // sender address has two way to be created:
    //CREATE: hash(sender + nonce) -> gettign the hash of deployer which is the AcountFactory and it's nonce, sender means deployer.
    //CREATE2: hash(0xFF(palceHolder) + sender + bytecode + salt)
    const sender = await hre.ethers.getCreateAddress({
        from: FACTORY_ADDRESS,
        nonce: FACTORY_NONCE,
    });

    // console.log("sender address:", sender);

    // AcountFactory contract code
    const AccountFactory = await hre.ethers.getContractFactory("AccountFactory");

    // console.log("AccountFactory is fine", AccountFactory);
    const [signer0] = await hre.ethers.getSigners();
    const address0 = await signer0.getAddress();
    // console.log("first address:", address0);

    // initCode = factory address + encode function data(only one function exist in AccountFactory contract: createAcount )
    // slice is removing the first 2 words(0x) of AccountFactory address to be valid
    const initCode =
        FACTORY_ADDRESS +
        AccountFactory.interface.encodeFunctionData("createAccount", [address0]).slice(2);

    // console.log("initCode is fine", initCode);

    //pre-fund on behalf of smart account
    // await entryPoint.depositTo(sender, { value: hre.ethers.parseEther("100") });

    //pre-fund on behalf of paymaster
    // const [deployer] = await hre.ethers.getSigners();
    // const amountToSend = hre.ethers.parseEther("100");
    // const txP = await deployer.sendTransaction({
    //     to: PAYMASTER_ADDRESS,
    //     value: amountToSend,
    // });

    // await txP.wait();
    await entryPoint.depositTo(PAYMASTER_ADDRESS, { value: hre.ethers.parseEther("100") });

    // const balance = await entryPoint.getDepositInfo(sender);
    // console.log("balance of sender:", balance.toString());

    const balance = await ethers.provider.getBalance(PAYMASTER_ADDRESS);
    console.log("Balance of", PAYMASTER_ADDRESS, "is", balance.toString(), "ETH");

    const Account = await hre.ethers.getContractFactory("Account");
    // console.log("Account is fine", Account);

    // filling with dommy values for now
    userOp = {
        sender, //smart account address
        nonce: await entryPoint.getNonce(sender, 0), // managing user op nonce with nonce manager of EntryPoint contract, sender is the smart account and 0 is the nonce key
        initCode,
        callData: Account.interface.encodeFunctionData("execute"),
        callGasLimit: 200_000,
        verificationGasLimit: 200_000,
        preVerificationGas: 50_000,
        maxFeePerGas: hre.ethers.parseEther("10", "gwei"),
        maxPriorityFeePerGas: hre.ethers.parseEther("5", "gwei"),
        paymasterAndData: PAYMASTER_ADDRESS,
        signature: "0x",
    };

    // making transaction
    // any AA21 error is about EntryPoint -> it need prefund, storing some ether on behalf of smart acount to pay the gas against the entrypoint
    const tx = await entryPoint.handleOps([userOp], address0); // instead of entrypoint we should use a bundler -> address0 should be bundler address to take the fees.
    const receipt = await tx.wait();
    console.log(receipt);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// hh run scripts/depoyEp.js --network localhost
// deploying contract on localhost
