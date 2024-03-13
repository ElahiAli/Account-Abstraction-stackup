import { ethers } from "ethers";
import { Presets, Client } from "userop";
import * as config from "../config.json";

const rpcUrl = config.rpcUrl;
const paymasterUrl =
    "https://api.stackup.sh/v1/paymaster/b51f0843db36f2f091c6fe6b3f1e8e25bb1b52dc7111797924c47e5d63b15fca";

async function main() {
    const paymasterContext = { type: "payg" };
    const paymasterMiddleware = Presets.Middleware.verifyingPaymaster(
        paymasterUrl,
        paymasterContext
    );
    const opts = {
        paymasterMiddleware: paymasterMiddleware,
    };

    // Initialize the account
    // const signingKey = "0x4337433743374337433743374337433743374337433743374337433743374337";
    const signingKey = config.PRIVATE_KEY;

    const signer = new ethers.Wallet(signingKey);
    var builder = await Presets.Builder.SimpleAccount.init(signer, rpcUrl, opts);
    const address = builder.getSender();
    console.log(`Account address: ${address}`);

    // Create the call data

    const AccountContractAddress = "0xE90116418c24817C649046075F745525C12b3daA"; // Address of the Account Abstraction

    // Read the KIP Token contract
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const Account_ABI = require("../abi/AccountAbstraction.json"); // KIP-Token ABI in json format
    const AccountContract = new ethers.Contract(AccountContractAddress, Account_ABI, provider);

    const amountNumber = "100";
    const decimals = "18";
    const amount = ethers.utils.parseUnits(amountNumber, decimals);

    const callTo = [
        AccountContractAddress,
        AccountContractAddress,
        AccountContractAddress,
        AccountContractAddress,
        AccountContractAddress,
    ];
    const callData = [
        AccountContract.interface.encodeFunctionData("escrowedTokens", [amount]),
        AccountContract.interface.encodeFunctionData("escrowedTokens", [amount]),
        AccountContract.interface.encodeFunctionData("escrowedTokens", [amount]),
        AccountContract.interface.encodeFunctionData("escrowedTokens", [amount]),
        AccountContract.interface.encodeFunctionData("escrowedTokens", [amount]),
    ];

    // Send the User Operation to the ERC-4337 mempool
    const client = await Client.init(rpcUrl);
    console.log("going for execute....");
    const res = await client.sendUserOperation(builder.executeBatch(callTo, callData), {
        onBuild: (op) => console.log("Signed UserOperation:", op),
    });
    // count of userOp
    console.log("number of user op:", callData.length);

    // Return receipt
    console.log(`UserOpHash: ${res.userOpHash}`);
    console.log("Waiting for transaction...");
    const ev = await res.wait();
    console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);
    console.log(`View here: https://jiffyscan.xyz/userOpHash/${res.userOpHash}`);

    console.log(`${amount} transferred to pool.`);
}

main().catch((err) => console.error("Error:", err));
