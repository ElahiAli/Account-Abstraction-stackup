import { ethers } from "ethers";
import { Presets, Client } from "userop";
import * as config from "../config.json";

const rpcUrl = "https://public.stackup.sh/api/v1/node/polygon-mumbai";

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
    const TETHER_ABI = require("./tetherAbi.json"); // KIP-Token ABI in json format
    const TetherContract = new ethers.Contract(TetherContractAddress, TETHER_ABI, provider);

    const callTo = [
        TetherContractAddress,
        TetherContractAddress,
        TetherContractAddress,
        TetherContractAddress,
        TetherContractAddress,
    ];
    const callData = [
        TetherContract.interface.encodeFunctionData("mint"),
        TetherContract.interface.encodeFunctionData("mint"),
        TetherContract.interface.encodeFunctionData("mint"),
        TetherContract.interface.encodeFunctionData("mint"),
        TetherContract.interface.encodeFunctionData("mint"),
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
