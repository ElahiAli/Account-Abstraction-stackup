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
}

main().catch((err) => console.error("Error:", err));
