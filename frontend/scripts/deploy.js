const { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, TransferTransaction } = require("@hashgraph/sdk");
// require('dotenv').config();
require('dotenv').config({ path: '../.env' });


async function environmentSetup() {

    //Grab your Hedera testnet account ID and private key from your .env file
    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;

    console.log(myAccountId);
    console.log(myPrivateKey);

    // If we weren't able to grab it, we should throw a new error
    if (!myAccountId || !myPrivateKey) {
        throw new Error("Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present");
    }

    //Create your Hedera Testnet client
    const client = Client.forTestnet();

    //Set your account as the client's operator
    client.setOperator(myAccountId, myPrivateKey);

    //const client = Client.forTestnet();
    //client.setOperator(myAccountId, myPrivateKey);
    //-----------------------<enter code below>--------------------------------------

    console.log("Client:", client)

    //Create new keys
    const newAccountPrivateKey = PrivateKey.generateED25519(); 

    console.log("Test:", newAccountPrivateKey)

    const newAccountPublicKey = newAccountPrivateKey.publicKey;

    console.log("public key:", newAccountPublicKey)

    //Create a new account with 1,000 tinybar starting balance
    try {
        const newAccount = await new AccountCreateTransaction()
            .setKey(newAccountPublicKey)
            .setInitialBalance(Hbar.fromTinybars(1000))
            .execute(client)    .then(newAccount => {
                console.log("New Account:", newAccount);
            })
            .catch(err => {
                console.error("Error creating account:", err);
            });
        
        console.log("New Account:", newAccount);
    } catch (err) {
        console.error("Error creating account:", err);
    }

    console.log("here:", newAccount)

    // Get the new account ID
    const getReceipt = await newAccount.getReceipt(client);
    const newAccountId = getReceipt.accountId;

    //Log the account ID
    console.log("The new account ID is: " +newAccountId);

    //Verify the account balance
    const accountBalance = await new AccountBalanceQuery()
    .setAccountId(newAccountId)
    .execute(client);

    console.log("The new account balance is: " +accountBalance.hbars.toTinybars() +" tinybar.");

    //console.log("The new account balance is: " +accountBalance.hbars.toTinybars() +" tinybar.");
    //-----------------------<enter code below>--------------------------------------

    //Create the transfer transaction
    const sendHbar = await new TransferTransaction()
    .addHbarTransfer(myAccountId, Hbar.fromTinybars(-1000)) //Sending account
    .addHbarTransfer(newAccountId, Hbar.fromTinybars(1000)) //Receiving account
    .execute(client);

    //Verify the transaction reached consensus
    const transactionReceipt = await sendHbar.getReceipt(client);
    console.log("The transfer transaction from my account to the new account was: " + transactionReceipt.status.toString());

    // return newAccountId

    //Set the default maximum transaction fee (in Hbar)
    // client.setDefaultMaxTransactionFee(new Hbar(100));

    // //Set the maximum payment for queries (in Hbar)
    // client.setMaxQueryPayment(new Hbar(50));

    console.log(accountBalance)

    //Import the compiled contract from the verifier.json file
    let verifier = require("../build/contracts/Verifier.json");
    const bytecode = verifier.bytecode;

    // //Create a file on Hedera and store the hex-encoded bytecode
    const fileCreateTx = new FileCreateTransaction()
            //Set the bytecode of the contract
            .setContents(bytecode);

    // //Submit the file to the Hedera test network signing with the transaction fee payer key specified with the client
    const submitTx = await fileCreateTx.execute(client);

    // //Get the receipt of the file create transaction
    const fileReceipt = await submitTx.getReceipt(client);

    // //Get the file ID from the receipt
    const bytecodeFileId = fileReceipt.fileId;

    // //Log the file ID
    console.log("The smart contract byte code file ID is " +bytecodeFileId)
}

var account = environmentSetup().then(err => console.log(err));

console.log(account)