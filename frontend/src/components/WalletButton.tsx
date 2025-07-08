'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState, useEffect } from 'react';

export const WalletButton = () => {
  const { connected, publicKey } = useWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2">
        <div className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
          Select Wallet
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      {connected && publicKey && (
        <div className="text-green-400 text-sm">
          {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
        </div>
      )}
      <WalletMultiButton className="!bg-emerald-600 hover:!bg-emerald-700 !text-white !py-2 !px-4 !rounded-lg !text-sm !font-medium !transition-colors" />
    </div>
  );
}; 