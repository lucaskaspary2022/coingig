/*-
 *
 * Hedera Hardhat Example Project
 *
 * Copyright (C) 2023 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const hre = require("hardhat");
const { expect } = require("chai");

describe("RPC", function () {
  let contractAddress;
  let signers;

  before(async function () {
    signers = await hre.ethers.getSigners();
  });

  it("should be able to get the account balance", async function () {
    const balance = await hre.run("show-balance");
    expect(Number(balance)).to.be.greaterThan(0);
  });

  it("should be able to deploy a contract", async function () {
    contractAddress = await hre.run("deploy-contract");
    expect(contractAddress).to.not.be.null;
  });

  it("should be able to make a contract view call", async function () {
    const res = await hre.run("contract-view-call", { contractAddress });
    expect(res).to.be.equal("0xDe871bD3e8dd00C3f85AeA3889ee8A477e02Ee3c");
  });

  it("should be able to deposit funds", async function () {
    // Deploy the contract (assuming you've done this before)
    contractAddress = await hre.run("deploy-contract");
    
    // Get the contract instance using the ABI and the deployed address.
    const Contract = await hre.ethers.getContractFactory("Verifier");
    const contractInstance = Contract.attach(contractAddress);
    
    // Specify the amount to deposit. For this example, 1 ether.
    const depositAmount = hre.ethers.utils.parseEther("1");

    // Call the deposit function. Ensure you have enough funds and take into account gas costs.
    await contractInstance.deposit({ value: depositAmount, from: signers[0].address, gasLimit: 500000 });
    
    // Get the balance after deposit
    const contractBalance = await contractInstance.getBalance();

    // Ensure the deposited amount is now in the contract.
    expect(contractBalance.toString()).to.equal(depositAmount.toString());
});


  // it("should be able to make a contract view call using another address", async function () {
  //   const anotherAddress = signers[1].address; // Assuming you want to use the address of the second signer.
  //   const res = await hre.run("contract-view-call", { contractAddress, inputAddress: anotherAddress });
  //   // Add logic to expect a certain result based on the anotherAddress.
  // });

  // it("should be able to make a contract call", async function () {
  //   const msg = "updated_msg";
  //   await hre.run("contract-call", { contractAddress, msg });
  //   const res = await hre.run("contract-view-call", { contractAddress });
  //   expect(res).to.be.equal(msg);
  // });
});
