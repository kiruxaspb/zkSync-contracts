# Using Hardhat for deploy & verify contract in ZK-Sync network

1. Install dependencies:
```shell
npm install
```

2. Check `hardhat.config.js` for setiing correct network
  
**[Attension]** Using lasest solc & zk-solc version

3. Compile your contracts:
```shell
npx hardhat compile
```
**[Attension] If you are creating a new project through `npx hardhat init`.**

**Create a `deploy` folder and place scripts for migrations**

4. Deploy your contract:
```shell
npx hardhat deploy-zksync --script deploy.ts --network <NETWORK>
```
5. Verify your contract:
```shell
npx hardhat verify --network <NETWORK> <DEPLOYED_ADDRESS> <CONSTRUCTOR ARGS>
```
or (for multiple migrations)
```shell
npx hardhat verify --contract "contracts/<CONTRACT_FILENAME>.sol:<TARGET_CONTRACT_NAME>" --network <NETWORK> <DEPLOYED_ADDRESS> <CONSTRUCTOR ARGS>
```
Success verified message:
```
Your verification ID is: 15730
Contract successfully verified on zkSync block explorer!
```

Example deployed & verified contract: [0xcee7564446FEcefbba86207e97ba59c2E49b9b56](https://goerli.explorer.zksync.io/address/0xcee7564446FEcefbba86207e97ba59c2E49b9b56#contract) **[ZKSync Testnet Era]**
