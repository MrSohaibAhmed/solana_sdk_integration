// App.js
import React from "react";
import Wallet from "./Wallet";
import WalletTwo from "./WalletTwo";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Phantom and Solflare Wallet Integration</h1>
      </header>
      <main>
        <Wallet />
        <WalletTwo />
      </main>
    </div>
  );
}

export default App;
