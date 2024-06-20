import React, { useState } from "react";

const WalletTwo = () => {
  const [provider, setProvider] = useState(null);
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState(null);
  const [signedMessage, setSignedMessage] = useState("");

  const getProvider = () => {
    if ("phantom" in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      }
    }

    // If Phantom is not detected, handle accordingly (open Phantom website or handle differently)
    window.open("https://phantom.app/", "_blank");
    return null;
  };

  const handleConnect = async () => {
    const provider = getProvider();
    if (!provider) {
      return; // Handle if Phantom provider is not available
    }

    try {
      setProvider(provider);

      // Connect and handle events
      await provider.connect();
      setConnected(true);

      // Retrieve public key
      const pubKey = provider.publicKey;
    //   debugger
    //   setPublicKey(pubKey);

      // Sign a message upon connection
      const message =
        "To avoid digital dognappers, sign below to authenticate with CryptoCorgis";
      const encodedMessage = new TextEncoder().encode(message);
      const signedMsg = await provider.signMessage(encodedMessage, "utf8");
      setSignedMessage(signedMsg);

      // Event listeners
      provider.on("disconnect", () => {
        setConnected(false);
        setPublicKey(null);
        setSignedMessage("");
      });

      provider.on("accountChanged", (pubKey) => {
        if (pubKey) {
          setPublicKey(pubKey);
        } else {
          setPublicKey(null);
          // Optionally handle re-connecting here if necessary
        }
      });
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  };

  const handleDisconnect = async () => {
    if (!provider) {
      return; // Handle if provider is not set
    }

    try {
      await provider.disconnect();
      setConnected(false);
      setPublicKey(null);
      setSignedMessage("");
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  };

  return (
    <div>
      <h2>Phantom Connector</h2>
      {/* <p>Status: {connected ? "Connected" : "Disconnected"}</p> */}
      {connected && (
        <>
          {/* <p>Public Key: {publicKey ? publicKey.toBase58() : "N/A"}</p> */}
          {/* <p>Signed Message: {signedMessage || "N/A"}</p> */}
        </>
      )}
      <button onClick={handleConnect} disabled={connected}>
        Connect to Phantom
      </button>
      <button onClick={handleDisconnect} disabled={!connected}>
        Disconnect
      </button>
    </div>
  );
};

export default WalletTwo;
