// Wallet.js
import React, { useState, useEffect } from 'react';
import Solflare from '@solflare-wallet/sdk';
import { Transaction } from '@solana/web3.js';

const Wallet = () => {
  const [wallet, setWallet] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const solflareWallet = new Solflare();
    
    solflareWallet.on('connect', () => {
      console.log('connected', solflareWallet.publicKey.toString());
      setPublicKey(solflareWallet.publicKey.toString());
      setConnected(true);
    });
    
    solflareWallet.on('disconnect', () => {
      console.log('disconnected');
      setPublicKey(null);
      setConnected(false);
    });

    setWallet(solflareWallet);
  }, []);

  const connectWallet = async () => {
    if (wallet) {
      await wallet.connect();
    }
  };

  const disconnectWallet = async () => {
    if (wallet) {
      await wallet.disconnect();
    }
  };

  const sendTransaction = async () => {
    if (wallet) {
      const transaction = new Transaction();
      // Add instructions to the transaction here
      
      try {
        const txSignature = await wallet.signAndSendTransaction(transaction);
        console.log('Transaction signature:', txSignature);
      } catch (error) {
        console.error('Transaction error:', error);
      }
    }
  };

  const signMessage = async () => {
    if (wallet) {
      const message = 'To verify your wallet on https://example.com, with this message';
      const messageBytes = new TextEncoder().encode(message);

      try {
        const signature = await wallet.signMessage(messageBytes, 'utf8');
        console.log('Message signature:', signature);
      } catch (error) {
        console.error('Message signing error:', error);
      }
    }
  };

  return (
    <div>
      <h1>Solflare Wallet Integration</h1>
      {connected ? (
        <div>
          <p>Connected with public key: {publicKey}</p>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
          <button onClick={sendTransaction}>Send Transaction</button>
          <button onClick={signMessage}>Sign Message</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default Wallet;
