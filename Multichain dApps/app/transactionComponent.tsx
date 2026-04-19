"use client";
import { useState } from "react";
import { parseGwei } from "viem";
import { sepolia } from "viem/chains";
import { ConnectWalletClient } from "./client";

export default function TransactionComponent() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter: any) => (evt: any) => setter(evt.target.value);

  async function handleClick() {
    try {
      const walletClient = ConnectWalletClient();
      const [address] = await walletClient.requestAddresses();
      await walletClient.switchChain({ id: sepolia.id });
      const hash = await walletClient.sendTransaction({
        account: address,
        to: recipient as `0x${string}`,
        value: parseGwei(amount), // GWei
      });
      alert(`Transaction successful. Transaction Hash: ${hash}`);
    } catch (error) {
      alert(`Transaction failed: ${error}`);
    }
  }

  return (
    <div className="card">
      <label>
        Amount:
        <input
          placeholder="GWei"
          value={amount}
          onChange={setValue(setAmount)}
        />
      </label>
      <br />
      <label>
        Recipient:
        <input
          placeholder="Address"
          value={recipient}
          onChange={setValue(setRecipient)}
        />
      </label>
      <button
        className="px-8 py-2 rounded-md flex flex-row items-center justify-center w-full mt-4 bg-blue-600 text-white hover:bg-blue-700"
        onClick={handleClick}
      >
        Send Transaction
      </button>
    </div>
  );
}
