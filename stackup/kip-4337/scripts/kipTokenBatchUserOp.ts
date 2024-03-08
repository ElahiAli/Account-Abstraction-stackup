import { ethers } from "ethers";
import { Presets, Client } from "userop";
import * as config from "../config.json";

const rpcUrl = "https://public.stackup.sh/api/v1/node/ethereum-sepolia";

const paymasterUrl = ""; // Optional - you can get one at https://app.stackup.sh/

async function main() {
    const paymasterContext = { type: "payg" };
    const paymasterMiddleware = Presets.Middleware.verifyingPaymaster(
        paymasterUrl,
        paymasterContext
    );
    const opts =
        paymasterUrl === ""
            ? {}
            : {
                  paymasterMiddleware: paymasterMiddleware,
              };

    // Initialize the account
    const signingKey = "0x4337433743374337433743374337433743374337433743374337433743374337";
    const signer = new ethers.Wallet(signingKey);
    var builder = await Presets.Builder.SimpleAccount.init(signer, rpcUrl, opts);
    const address = builder.getSender();
    console.log(`Account address: ${address}`);

    // Create the call data

    const kipTokenAddress = "0x1acdff24400850f20344cFB10183c417dA92a85b"; // Address of the Account Abstraction

    // Read the KIP Token contract
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const KIP_TOKEN_ABI = require("./KIP.json"); // KIP-Token ABI in json format
    const kipTokenContract = new ethers.Contract(kipTokenAddress, KIP_TOKEN_ABI, provider);

    const callTo = [
        kipTokenAddress,
        kipTokenAddress,
        kipTokenAddress,
        kipTokenAddress,
        kipTokenAddress,
    ];
    const callData = [
        kipTokenContract.interface.encodeFunctionData("mint"),
        kipTokenContract.interface.encodeFunctionData("mint"),
        kipTokenContract.interface.encodeFunctionData("mint"),
        kipTokenContract.interface.encodeFunctionData("mint"),
        kipTokenContract.interface.encodeFunctionData("mint"),
    ];

    // Send the User Operation to the ERC-4337 mempool
    const client = await Client.init(rpcUrl);
    const res = await client.sendUserOperation(builder.executeBatch(callTo, callData), {
        onBuild: (op) => console.log("Signed UserOperation:", op),
    });

    // Return receipt
    console.log(`UserOpHash: ${res.userOpHash}`);
    console.log("Waiting for transaction...");
    const ev = await res.wait();
    console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);
    console.log(`View here: https://jiffyscan.xyz/userOpHash/${res.userOpHash}`);
}

main().catch((err) => console.error("Error:", err));
