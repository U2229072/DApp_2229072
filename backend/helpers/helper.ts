import algosdk from "algosdk";
import { getClient, getAccount } from "../config/config.js";

export const saveData = async (data: any): Promise<any> => {
  try {
    const client = getClient();
    const account = getAccount();
    const suggestedParams = await client.getTransactionParams().do();

    const note = algosdk.encodeObj(data);

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: account.addr,
      to: account.addr, // Sending the transaction to oneself
      amount: 1000, // Minimum amount
      note: note,
      suggestedParams: suggestedParams,
    });

    const signedTxn = txn.signTxn(account.sk);
    const sendTxn = await client.sendRawTransaction(signedTxn).do();
    const acctInfo = await client.accountInformation(account.addr).do();
    console.log(`Account balance: ${acctInfo.amount} microAlgos`);

    console.log("Transaction ID:", sendTxn.txId);
    return { balance: acctInfo.amount, transaction: sendTxn.txId };
  } catch (error) {
    console.error("Failed to store weather data:", error);
  }
};
