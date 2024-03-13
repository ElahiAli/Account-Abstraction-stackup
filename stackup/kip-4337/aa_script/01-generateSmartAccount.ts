import { ethers } from "ethers";
import { Presets } from "userop";
import * as config from "../config.json";

const rpcUrl = config.rpcUrl;
const paymasterUrl = "";

async function generateAccount() {
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
}

generateAccount().catch((error) => {
    console.error(error);
    process.exit();
});
