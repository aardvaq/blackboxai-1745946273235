import { useState } from 'react';
import { ethers } from 'ethers';
import { PublicKey, Connection } from '@solana/web3.js';

export default function Home() {
  const [ethAccount, setEthAccount] = useState(null);
  const [solAccount, setSolAccount] = useState(null);

  // Connect to MetaMask or TrustWallet (Ethereum)
  const connectEthereumWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask or TrustWallet!');
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setEthAccount(address);
    } catch (err) {
      console.error(err);
      alert('Failed to connect Ethereum wallet');
    }
  };

  // Connect to Phantom Wallet (Solana)
  const connectPhantomWallet = async () => {
    if (typeof window.solana === 'undefined' || !window.solana.isPhantom) {
      alert('Please install Phantom Wallet!');
      return;
    }
    try {
      const resp = await window.solana.connect();
      setSolAccount(resp.publicKey.toString());
    } catch (err) {
      console.error(err);
      alert('Failed to connect Phantom wallet');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-8">Simple Wallet Connect</h1>

      <div className="bg-white p-6 rounded shadow-md w-full max-w-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Ethereum Wallets</h2>
        {ethAccount ? (
          <p className="text-green-600 break-all">Connected: {ethAccount}</p>
        ) : (
          <button
            onClick={connectEthereumWallet}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Connect MetaMask / TrustWallet
          </button>
        )}
      </div>

      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Solana Wallet</h2>
        {solAccount ? (
          <p className="text-green-600 break-all">Connected: {solAccount}</p>
        ) : (
          <button
            onClick={connectPhantomWallet}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Connect Phantom Wallet
          </button>
        )}
      </div>
    </div>
  );
}
