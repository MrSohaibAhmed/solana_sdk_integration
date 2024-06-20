// App.js
import React from "react";
import Wallet from "./Wallet";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Solflare Wallet Integration</h1>
      </header>
      <main>
        <Wallet />
      </main>
    </div>
  );
}

export default App;
