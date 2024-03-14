# Hardhat

The purpose of creating the hardhat project was to deploy the contracts and get the contrac's ABI of those contracts and use those Json files in the stackup scripts.

### Install project

```shell
cd Kip-account-abstraction-contract-HH
```

```shell
yarn install
```

### compile

```shell
hh compile
```

### deploy localhost

```shell
hh node
```

### deploy testnet(mumbai)

```shell
hh run deploy/ <script name> --network mumbai
```

### Contracts

#### AccountKip.sol

simple account contract for deploying on testnet and creating user ops.

##### function:

-   escrowedTokens:
    -   transferring tokens to pool contract.
-   withdraw:
    -   getting back the remained tokens by end-user.

#### IPool.sol

Pool contract's interface.

##### goal:

-   using the pool contract functions inside the account abstraction contract.

#### mock folder

different vesions of contracts for working with.

---

# Account Abstraction

## Stackup

Stackup is building the infrastructure needed to transition the world to blockchains.

The user op implementation process in this repository is implemented single and batch.

there are two project in the stackup folder:

1. erc-4337
2. kip-4337

### ERC-4337 Project:

stackup quickstart project:
https://docs.stackup.sh/docs/getting-started

### KIP-4337 Project:

#### Install project

```shell
cd Kip-account-abstraction-contract-HH/stackup/kip-4337
```

```shell
yarn install
```

#### run scripts

```shell
yarn run dev aa_scripts/<script name>
```

#### process of aa_scripts files:

##### goal:

1. generate an smart account for users _<script 01>_
2. increase the smart account balance with kip tokens _<script 02>_
3. approving tokens to AA contract _<script 03>_
4. getting the allowance of smart account and AA contract address _<script 04>_
5. transfer token, calling the function one time and create only one user op _<script 05>_
6. transfer tokens, calling the function multiple time and create several user op _<script 06>_

##### Let's create a batch transfer:

-   for creating a batch transfer first we need to create a smart account and mint KIP token.

```shell
yarn run dev aa_scripts/02-mintKIPTokenWithSmartAccount
```

-   second step is to approve some tokens to Account Abstraction contract.

```shell
yarn run dev aa_scripts/03-approveKIPTokenWithSmartAcount
```

-   third step is to check the allowance and make sure that the AA contract has some tokens as approved tokens.

```shell
yarn run dev aa_scripts/03-approveKIPTokenWithSmartAcount
```

-   fourth step is to transfer approved tokens to pool contract.(batch transfer)

```shell
yarn run dev aa_scripts/06-transferBatchKipToken
```

##### Explanation for 06-transferBatchKipToken script:

rpcUrl is the bundler url, can be received from stackup dashboard.
paymasterUrl can be get from the stackup dashboard too.

```shell
const rpcUrl = config.rpcUrl;
const paymasterUrl =
    "https://api.stackup.sh/v1/paymaster/b51f0843db36f2f091c6fe6b3f1e8e25bb1b52dc7111797924c47e5d63b15fca";
```

creating a smart account for sending user op

```shell
const signingKey = config.PRIVATE_KEY;
const signer = new ethers.Wallet(signingKey);
var builder = await Presets.Builder.SimpleAccount.init(signer, rpcUrl, opts);
const address = builder.getSender();
console.log(`Account address: ${address}`);
```

AccountContractAddress is the Account Abstraction contract that have been deployed to mumbai.
using this address and the contract ABI file we can get the contract it self.

```shell
const AccountContractAddress = "0xE90116418c24817C649046075F745525C12b3daA";

const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const Account_ABI = require("../abi/AccountAbstraction.json"); // KIP-Token ABI in json format
const AccountContract = new ethers.Contract(AccountContractAddress, Account_ABI, provider);

```

callTo refers to "where the transaction must be call" we should pass the AA contract address as many time as we want to call a function inside this contract.

```shell
 const callTo = [
        AccountContractAddress,
        AccountContractAddress,
        AccountContractAddress,
        AccountContractAddress,
        AccountContractAddress,
    ];
```

callData is the list of our calls, if we want to call a function for 5 time we should do like this:</br>
escrowedTokens is a function inside AA contract.</br>
[amount] is the function variable.

```shell
const callData = [
        AccountContract.interface.encodeFunctionData("escrowedTokens", [amount]),
        AccountContract.interface.encodeFunctionData("escrowedTokens", [amount]),
        AccountContract.interface.encodeFunctionData("escrowedTokens", [amount]),
        AccountContract.interface.encodeFunctionData("escrowedTokens", [amount]),
        AccountContract.interface.encodeFunctionData("escrowedTokens", [amount]),
    ];
```

at the end we must execute the user operations.</br>
sending the transaction to entryPoint through bundler

```shell
 const client = await Client.init(rpcUrl);
    console.log("going for execute....");
    const res = await client.sendUserOperation(
        builder.executeBatch(callTo, callData), {
        onBuild: (op) => console.log("Signed UserOperation:", op),
    });
```

---

KIP-4337 project:

mockScript folder contain batch and single user operation with other mock contract like tether(erc-20) , KipToken(erc-20) contracts
_used for tests_
