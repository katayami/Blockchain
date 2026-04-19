"use client";
import { useState } from "react";
import { ConnectWalletClient, ConnectPublicClient } from "./client";

export default function WalletComponent() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(BigInt(0));

  async function handleClick() {
    try {
      const walletClient = ConnectWalletClient();
      const publicClient = ConnectPublicClient();
      const [address] = await walletClient.requestAddresses();
      const balance: bigint = await publicClient.getBalance({ address });
      setAddress(address);
      setBalance(balance);
    } catch (error) {
      alert(`Transaction failed: ${error}`);
    }
  }

  return (
    <div className="card">
      <Status address={address} balance={balance} />
      <button
        className="px-8 py-2 rounded-md flex flex-row items-center justify-center w-full mt-4 bg-blue-600 text-white hover:bg-blue-700"
        onClick={handleClick}
      >
        <h1 className="mx-auto">Connect Wallet</h1>
      </button>
    </div>
  );
}

function Status({
  address,
  balance,
}: {
  address: string | null;
  balance: BigInt;
}) {
  if (!address) {
    return (
      <div className="flex items-center gap-2 mb-4">
        <div className="border bg-red-600 border-red-600 rounded-full w-2 h-2"></div>
        <div>Disconnected</div>
      </div>
    );
  }

  return (
    <div className="flex items-center w-full gap-2 mb-4">
      <div className="border bg-green-500 border-green-500 rounded-full w-2 h-2"></div>
      <div className="text-s md:text-s">
        {address} <br /> <b>Balance:</b> {balance.toString()} <b>Wei</b>
      </div>
    </div>
  );
}
