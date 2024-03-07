import { ethers } from "ethers";
import { Presets, Client } from "userop";

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
    const to = address; // Receiving address, in this case we will send it to ourselves
    const token = "0x3870419Ba2BBf0127060bCB37f69A1b1C090992B"; // Address of the ERC-20 token
    const value = "0"; // Amount of the ERC-20 token to transfer

    // Read the ERC-20 token contract
    const ERC20_ABI = require("./AccountAbstraction.json"); // Account-Abstraction ABI in json format
    const erc20 = new ethers.Contract(token, ERC20_ABI, provider);
    const decimals = await Promise.all([erc20.decimals()]);
    const amount = ethers.utils.parseUnits(value, decimals);

    // Encode the calls
    const callTo = [token, token];
    const callData = [
        erc20.interface.encodeFunctionData("approve", [to, amount]),
        erc20.interface.encodeFunctionData("transfer", [to, amount]),
    ];
}

main().catch((err) => console.error("Error:", err));
