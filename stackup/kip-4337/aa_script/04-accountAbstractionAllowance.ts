import { ethers } from "ethers";
import { Presets, Client } from "userop";
import * as config from "../config.json";
import { generateAccount } from "./01-generateSmartAccount";

const rpcUrl = config.rpcUrl;

async function Allowance() {
    const address = await generateAccount();
    const KIPTokenAddress = "0x01907E8215e48809E1E06083294fCb5FC74296f5";

    // getting the Kip erc-20 contract
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const KipTone_ABI = require("../abi/KIP.json");
    const KIPContract = new ethers.Contract(KIPTokenAddress, KipTone_ABI, provider);

    const spender = "0xE90116418c24817C649046075F745525C12b3daA"; // AA contract

    const addressAllowance = await KIPContract.allowance(address, spender);
    console.log(address, `allowance: ${addressAllowance}`);
}

Allowance().catch((error) => {
    console.error(error);
    process.exit();
});
