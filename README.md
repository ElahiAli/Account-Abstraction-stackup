# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

```
using openzeppelin @4.2.0 version for EntryPoint
```

how does entry point find out about an account?
there is a function in EntryPoint contract ```createSenderIfNeeded```
this function will check the initCode variable if it wasn't zero it will get an sender, sender is the smart account,
then it will create a sender with that method and will compare them.

initCode?
is a field in user operation.
the first 20 bytes of initCode is the factory address.
the rest os the initCode is the calldata that we're sending over to the account.

what is sender?
it is smart contract that will be create in EntryPoint contract.
it has a function named ```createSender```.
this function will create a factory and then it will pass the factory to the initCode again.

what is Account Factory?
it will create and deploy a new smart account.