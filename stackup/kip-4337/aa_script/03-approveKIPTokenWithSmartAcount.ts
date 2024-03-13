import { ethers } from "ethers";
import { Presets, Client } from "userop";
import * as config from "../config.json";

const rpcUrl = config.rpcUrl;
const paymasterUrl = "";

async function mintKipToken() {
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

    const KIPTokenAddress = "0x01907E8215e48809E1E06083294fCb5FC74296f5";

    // getting the Kip erc-20 contract
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const KipTone_ABI = require("../abi/KIP.json");
    const KIPContract = new ethers.Contract(KIPTokenAddress, KipTone_ABI, provider);

    // Send the User Operation to the ERC-4337 mempool
    const spender = "0xE90116418c24817C649046075F745525C12b3daA";
    const amountNumber = "100";
    const decimals = 18;
    const symbol = await KIPContract.symbol();
    const amount = ethers.utils.parseUnits(amountNumber, decimals);

    const client = await Client.init(rpcUrl);
    const res = await client.sendUserOperation(
        builder.execute(
            KIPTokenAddress,
            0,
            KIPContract.interface.encodeFunctionData("approve", [spender, amount])
        ),
        {
            onBuild: (op) => console.log("Signed UserOperation:", op),
        }
    );

    // Return receipt
    console.log(`UserOpHash: ${res.userOpHash}`);
    console.log("Waiting for transaction...");
    const ev = await res.wait();
    console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);
    console.log(`View here: https://jiffyscan.xyz/userOpHash/${res.userOpHash}`);

    const addressAllowance = await KIPContract.allowance(address, spender);
    console.log(address, `allowance: ${addressAllowance}`);
}

mintKipToken().catch((error) => {
    console.error(error);
    process.exit();
});
