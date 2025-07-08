'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Image from 'next/image';
import JupNexusWidget from '../../components/JupNexusWidget';
import { WalletButton } from '../../components/WalletButton';
import { useJupNexusStore } from '../../store/jupnexus';
import Toast from '../../components/Toast';

interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
}

interface Quote {
  inAmount: string;
  outAmount: string;
  priceImpactPct?: string;
  routePlan: Array<{
    swapInfo: {
      ammKey: string;
      label: string;
      inputMint: string;
      outputMint: string;
      inAmount: string;
      outAmount: string;
      feeAmount: string;
      feeMint: string;
    };
    percent: number;
  }>;
}

export default function SwapPage() {
  const router = useRouter();
  const { connected, publicKey } = useWallet();
  const { trackActivity } = useJupNexusStore();
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{message: string, type: 'success' | 'info' | 'warning' | 'error'} | null>(null);

  // Token'ları yükle
  useEffect(() => {
    const loadTokens = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/jupiter/tokens');
        const tokensData = await response.json();
        
        // Default olarak SOL ve USDC seç
        const sol = tokensData.find((t: Token) => t.symbol === 'SOL');
        const usdc = tokensData.find((t: Token) => t.symbol === 'USDC');
        
        if (sol) setFromToken(sol);
        if (usdc) setToToken(usdc);
      } catch (err) {
        console.error('Token yüklenemedi:', err);
        setError('Token listesi yüklenemedi');
      }
    };

    loadTokens();
  }, []);

  // Quote al
  const getQuote = useCallback(async () => {
    if (!fromToken || !toToken || !fromAmount || fromAmount === '0') {
      setQuote(null);
      setToAmount('');
      return;
    }

    setIsLoadingQuote(true);
    setError('');

    try {
      const amount = Math.floor(parseFloat(fromAmount) * Math.pow(10, fromToken.decimals));
      
      const response = await fetch('http://localhost:3001/api/jupiter/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputMint: fromToken.address,
          outputMint: toToken.address,
          amount: amount.toString(),
          slippageBps: 50,
        }),
      });

      const quoteData = await response.json();
      
      if (!response.ok) {
        throw new Error(quoteData.error);
      }

      setQuote(quoteData);
      const outputAmount = parseFloat(quoteData.outAmount) / Math.pow(10, toToken.decimals);
      setToAmount(outputAmount.toFixed(6));
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Quote alınamadı';
      console.error('Quote alınamadı:', err);
      setError(errorMessage);
      setQuote(null);
      setToAmount('');
    } finally {
      setIsLoadingQuote(false);
    }
  }, [fromAmount, fromToken, toToken]);

  // Amount değiştiğinde quote al
  useEffect(() => {
    const timer = setTimeout(() => {
      getQuote();
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [getQuote]);

  const swapTokens = () => {
    const tempToken = fromToken;
    const tempAmount = fromAmount;
    
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  // Simulated swap function
  const handleSwap = async () => {
    if (!connected || !publicKey) {
      setToast({
        message: '⚠️ Please connect your wallet first!',
        type: 'warning'
      });
      return;
    }

    if (!quote || !fromToken || !toToken) {
      setToast({
        message: '⚠️ Please get a quote first!',
        type: 'warning'
      });
      return;
    }

    setIsSwapping(true);
    setError('');

    // Show processing toast
    setToast({
      message: `🔄 Swapping ${fromAmount} ${fromToken.symbol} → ${toAmount} ${toToken.symbol}...`,
      type: 'info'
    });

    try {
      // Simulate swap delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate successful swap
      const simulatedTxSignature = `simulated_tx_${Date.now()}`;
      
      // Track activity in Cattie AI
      await trackActivity('swap_completed', simulatedTxSignature);

      // Show success toast
      setToast({
        message: `🎉 Swap completed! ${fromAmount} ${fromToken.symbol} → ${toAmount} ${toToken.symbol}. Check Cattie AI widget for AI suggestions!`,
        type: 'success'
      });

      // Reset form
      setFromAmount('');
      setToAmount('');
      setQuote(null);

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Swap simulation failed';
      console.error('Swap failed:', err);
      setError(errorMessage);
      setToast({
        message: '❌ Swap simulation failed. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSwapping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center overflow-hidden">
                <Image 
                  src="/CattieAI.png" 
                  alt="Cattie AI" 
                  width={24}
                  height={24}
                  className="object-cover rounded-full"
                />
              </div>
              <h1 className="text-xl font-bold">Jupiter Swap Demo</h1>
              <div className="bg-emerald-600 text-white px-2 py-1 rounded text-xs font-bold">
                ✅ REAL API
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <WalletButton />
              <button 
                onClick={() => router.push('/')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
              >
                🏠 Home
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">
            🔄 Jupiter Swap Interface
          </h2>
          <p className="text-gray-300 mb-6">
            This uses <strong>real Jupiter APIs</strong> for quotes and token data. 
            Cattie AI will integrate with your actual swap transactions.
          </p>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* Real Swap Interface */}
          <div className="bg-gray-700 rounded-lg p-6 max-w-md mx-auto">
            <div className="space-y-4">
              {/* From Token */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  From Token
                </label>
                <div className="bg-gray-600 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold">
                      {fromToken?.symbol.charAt(0) || '?'}
                    </div>
                    <span className="text-white">{fromToken?.symbol || 'Select'}</span>
                  </div>
                  <input 
                    type="number" 
                    placeholder="0.00" 
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    className="bg-transparent text-white text-right outline-none w-20"
                  />
                </div>
              </div>

              {/* Swap Arrow */}
              <div className="flex justify-center">
                <button 
                  onClick={swapTokens}
                  className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                >
                  <span className="text-white">⇅</span>
                </button>
              </div>

              {/* To Token */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  To Token
                </label>
                <div className="bg-gray-600 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">
                      {toToken?.symbol.charAt(0) || '?'}
                    </div>
                    <span className="text-white">{toToken?.symbol || 'Select'}</span>
                  </div>
                  <div className="text-white text-right">
                    {isLoadingQuote ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <span>{toAmount || '0.00'}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quote Info */}
              {quote && (
                <div className="bg-gray-600 rounded-lg p-3">
                  <div className="text-xs text-gray-300 space-y-1">
                    {quote.priceImpactPct && (
                      <div className="flex justify-between">
                        <span>Price Impact:</span>
                        <span className={parseFloat(quote.priceImpactPct) > 1 ? 'text-red-400' : 'text-green-400'}>
                          {parseFloat(quote.priceImpactPct).toFixed(2)}%
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Route:</span>
                      <span>{quote.routePlan?.length || 0} hops</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Swap Button */}
              <button 
                onClick={handleSwap}
                disabled={!quote || isLoadingQuote || isSwapping || !connected}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                {isSwapping ? '⏳ Swapping...' : 
                 isLoadingQuote ? '⏳ Getting Quote...' : 
                 !connected ? '🔗 Connect Wallet First' :
                 !quote ? '📊 Get Quote First' :
                 '🔄 Simulate Swap'}
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2 text-emerald-400">📋 Real Jupiter Integration</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• ✅ <strong>Real Jupiter Quote API</strong> - Live token prices and routes</li>
              <li>• ✅ <strong>Real Token Data</strong> - Actual Jupiter token metadata</li>
              <li>• ✅ <strong>Live Price Impact</strong> - Real slippage calculations</li>
              <li>• 🔄 <strong>Simulated Swap</strong> - Triggers Cattie AI suggestions</li>
              <li>• 📊 Try changing amounts to see live quotes</li>
              <li>• 🔗 Connect wallet and click &quot;Simulate Swap&quot; to see AI suggestions!</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Cattie AI Widget */}
      <JupNexusWidget />

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
} 