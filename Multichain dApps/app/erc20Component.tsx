"use client";
import { getContract, Address } from "viem";
import { erc20Abi } from "./erc20abi";
import { ConnectPublicClient } from "./client";
import { useState } from "react";

export default function Erc20Component() {
  const [contractAddress, setContractAddress] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [info, setInfo] = useState<string | null>(null);

  const setValue = (setter: any) => (evt: any) => setter(evt.target.value);

  async function buttonClick() {
    try {
      const publicClient = ConnectPublicClient();
      const checkedAddress = contractAddress as Address;

      const contract = getContract({
        address: checkedAddress,
        abi: erc20Abi,
        client: publicClient,
      });

      const name = await contract.read.name();
      const symbol = await contract.read.symbol();
      const decimals = await contract.read.decimals();
      const totalSupply = await contract.read.totalSupply();

      let result = `Name: ${name}\nSymbol: ${symbol}\nDecimals: ${decimals}\nTotal Supply: ${(Number(totalSupply) / 10 ** decimals).toFixed(4)} ${symbol}`;

      if (walletAddress) {
        const balance = await contract.read.balanceOf([walletAddress as Address]);
        result += `\nBalance of ${walletAddress}: ${(Number(balance) / 10 ** decimals).toFixed(4)} ${symbol}`;
      }

      setInfo(result);
    } catch (error) {
      alert(`Error: ${error}`);
    }
  }

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4">ERC-20 Token Info (WETH)</h2>
      <label>
        Contract Address:
        <input
          placeholder="0x..."
          value={contractAddress}
          onChange={setValue(setContractAddress)}
        />
      </label>
      <br />
      <label>
        Wallet Address (optional):
        <input
          placeholder="0x... (для проверки баланса)"
          value={walletAddress}
          onChange={setValue(setWalletAddress)}
        />
      </label>
      <button
        className="px-8 py-2 rounded-md flex flex-row items-center justify-center w-full mt-4 bg-blue-600 text-white hover:bg-blue-700"
        onClick={buttonClick}
      >
        Get Token Info
      </button>
      {info && (
        <pre className="mt-4 p-3 bg-gray-100 rounded text-sm whitespace-pre-wrap">
          {info}
        </pre>
      )}
    </div>
  );
}
