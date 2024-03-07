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

    const aaAdress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // Address of the Account Abstraction

    // Read the Account Abstraction contract
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const AccountAbstraction_ABI = require("./AccountAbstraction.json"); // Account-Abstraction ABI in json format
    const AAContract = new ethers.Contract(aaAdress, AccountAbstraction_ABI, provider);

    // Encode the calls
    const callTo = [aaAdress, aaAdress];
    const callData = [AAContract.interface.encodeFunctionData("getAccountAbstractionBalance")];

    // Send the User Operation to the ERC-4337 mempool
    const client = await Client.init(rpcUrl);
    const res = await client.sendUserOperation(builder.executeBatch(callTo, callData), {
        onBuild: (op) => console.log("Signed UserOperation:", op),
    });
}

main().catch((err) => console.error("Error:", err));
