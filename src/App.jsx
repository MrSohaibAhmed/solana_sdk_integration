// App.js
import React from "react";
import Wallet from "./Wallet";
import WalletTwo from "./WalletTwo";
import "./App.css";
import WalletWithProvider from "./PhantomWallet";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Phantom and Solflare Wallet Integration</h1>
      </header>
      <main>
        {/* <Wallet />
        <WalletTwo /> */}
        <WalletWithProvider/>
      </main>
    </div>
  );
}

export default App;
