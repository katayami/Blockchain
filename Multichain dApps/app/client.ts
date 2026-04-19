import { createWalletClient, createPublicClient, custom, http } from "viem";
import { sepolia } from "viem/chains";
import "viem/window";

export function ConnectPublicClient() {
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
  });

  return publicClient;
}

export function ConnectWalletClient() {
  let transport;
  if (window.ethereum) {
    // EIP-1193 Ethereum Provider JavaScript API
    transport = custom(window.ethereum);
  } else {
    const errorMessage = "Web3 wallet is not installed. Please install MetaMask or another Web3 wallet.";
    throw new Error(errorMessage);
  }

  const walletClient = createWalletClient({
    chain: sepolia,
    transport: transport,
  });

  return walletClient;
}
