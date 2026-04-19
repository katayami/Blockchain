"use client";
import { getContract, Address } from "viem";
import { contractAbi } from "./abi";
import { ConnectPublicClient } from "./client";
import { useState } from "react";

export default function TokenComponent() {
  const [contractAddress, setContractAddress] = useState("");
  const [tokenId, setTokenId] = useState("");

  const setValue = (setter: any) => (evt: any) => setter(evt.target.value);

  async function buttonClick() {
    try {
      const publicClient = ConnectPublicClient();
      const checkedAddress = contractAddress as Address;

      const contract = getContract({
        address: checkedAddress,
        abi: contractAbi,
        client: publicClient,
      });

      const symbol = await contract.read.symbol();
      const name = await contract.read.name();

      console.log(`Symbol: ${symbol}\nName: ${name}\n`);

      const token_id = BigInt(tokenId);
      const owner = await contract.read.ownerOf([token_id]);

      alert(`Symbol: ${symbol}\nName: ${name}\nOwner of token_id = ${token_id}: ${owner}`);
    } catch (error) {
      alert(`Error: ${error}`);
    }
  }

  return (
    <div className="card">
      <label>
        Address:
        <input
          placeholder="Smart Contract Instance"
          value={contractAddress}
          onChange={setValue(setContractAddress)}
        />
      </label>
      <br />
      <label>
        Token Id:
        <input
          placeholder="1"
          value={tokenId}
          onChange={setValue(setTokenId)}
        />
      </label>
      <button
        className="px-8 py-2 rounded-md flex flex-row items-center justify-center w-full mt-4 bg-blue-600 text-white hover:bg-blue-700"
        onClick={buttonClick}
      >
        <h1 className="text-center">Token Info</h1>
      </button>
    </div>
  );
}
