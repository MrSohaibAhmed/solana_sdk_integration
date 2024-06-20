import React, { useState, useMemo } from 'react';
import {
  WalletProvider,
  useWallet,
  ConnectionProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  SolflareWalletAdapter,
  PhantomWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

const NETWORK = WalletAdapterNetwork.Devnet; // Change to Mainnet or other network if needed

const Wallet = () => {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const { connect, disconnect, connected } = useWallet();

  const wallets = useMemo(
    () => [
    //   new SolflareWalletAdapter(),
      new PhantomWalletAdapter(),
      // Add other wallet adapters as needed
    ],
    []
  );

  const connectWallet = async (walletAdapter) => {
    debugger
    console.log("hello")
    debugger
    try {
      await connect(walletAdapter);
      setSelectedWallet(walletAdapter);
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const disconnectWallet = async () => {

    try {
      await disconnect();
      setSelectedWallet(null);
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  return (
    <div>
      <h2>Wallet Connector</h2>
      <p>Selected Wallet: {selectedWallet?.name}</p>
      <p>Connection Status: {connected ? 'Connected' : 'Disconnected'}</p>

      {/* Connect buttons */}
      <div>
        {wallets.map((walletAdapter, index) => (
          <button
            key={index}
            onClick={() => connectWallet(walletAdapter)}
            disabled={connected}
          >
            Connect {walletAdapter.name}
          </button>
        ))}
      </div>

      {/* Disconnect button */}
      {connected && (
        <button onClick={disconnectWallet} disabled={!connected}>
          Disconnect
        </button>
      )}
    </div>
  );
};

const WalletWithProvider = () => {
  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter(),
      new PhantomWalletAdapter(),
      // Add other wallet adapters as needed
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={clusterApiUrl(NETWORK)}>
      <WalletProvider wallets={wallets} autoConnect={false}>
      <WalletModalProvider>
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                    { /* Your app's components go here, nested within the context providers. */ }
                
</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletWithProvider;
