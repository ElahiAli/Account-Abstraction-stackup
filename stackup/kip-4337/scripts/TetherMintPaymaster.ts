import { ethers } from "ethers";
import { Presets, Client } from "userop";
import * as config from "../config.json";

const rpcUrl =
    "https://api.stackup.sh/v1/node/b51f0843db36f2f091c6fe6b3f1e8e25bb1b52dc7111797924c47e5d63b15fca";

const paymasterUrl = "";

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

    const TetherContractAddress = "0xb53e6701DE7fdd733C1B8eA0716158071ceC22c6"; // Address of the Account Abstraction

    // Read the KIP Token contract
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const TETHER_ABI = require("../abi/tetherAbi.json"); // KIP-Token ABI in json format
    const tetherContract = new ethers.Contract(TetherContractAddress, TETHER_ABI, provider);

    const amountNumber = "1000";
    const decimals = 6;
    const symbol = await tetherContract.symbol();

    const amount = ethers.utils.parseUnits(amountNumber, decimals);
    const spender = config.SPENDER;
    console.log(`Approving ${amountNumber} ${symbol}...`);

    const callTo = [TetherContractAddress, TetherContractAddress];
    const callData = [
        tetherContract.interface.encodeFunctionData("approve", [spender, amount]),
        tetherContract.interface.encodeFunctionData("transfer", [spender, amount]),
    ];

    // Send the User Operation to the ERC-4337 mempool
    const client = await Client.init(rpcUrl);
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
}

main().catch((err) => console.error("Error:", err));
