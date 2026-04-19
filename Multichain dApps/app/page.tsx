import WalletComponent from "./walletComponent";
import TransactionComponent from "./transactionComponent";
import TokenComponent from "./tokenComponent";
import Erc20Component from "./erc20Component";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="flex flex-col items-center justify-center py-16">
        <WalletComponent />
        <TransactionComponent />
        <TokenComponent />
        <Erc20Component />
      </div>
    </main>
  );
}
