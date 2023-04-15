import { utils, Wallet } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import fs from "fs"

const PRIVATE_KEY = fs.readFileSync(".secret").toString();

// An example of a deploy script that will deploy and call a simple token contract contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy token contract script`);

  // Initialize the wallet.
  const wallet = new Wallet(PRIVATE_KEY);

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);
  // Load contract
  const tokenArtifact = await deployer.loadArtifact("KTokenX");
  
  const deploymentFee = await deployer.estimateDeployFee(tokenArtifact, []);
  console.log('Transaction fee: ', deploymentFee);

  // Optional
  // Deposit ETH to zksync for deployment
  const tx = await deployer.zkWallet.deposit({
    to: deployer.zkWallet.address,
    token: utils.ETH_ADDRESS,
    // for safety gas price
    // fee + 50%
    amount: deploymentFee.add(deploymentFee.mul(0.5))
  });

  await tx.wait();

  // Deploy token contract.
  const Token = await deployer.deploy(tokenArtifact);

  // code for multiple mirgrations
  const stakeArtifact = await deployer.loadArtifact("Stake");
  const Stake = await deployer.deploy(stakeArtifact, [Token.address]);

  // Show the contract info.
  // console.log(`${tokenArtifact.contractName} was deployed to ${Token.address}`);
  console.log(`${tokenArtifact.contractName} was deployed to ${Token.address}`);
  console.log(`${stakeArtifact.contractName} was deployed to ${Stake.address}`);
}