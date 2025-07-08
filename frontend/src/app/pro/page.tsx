'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import JupNexusWidget from '../../components/JupNexusWidget';
import { WalletButton } from '../../components/WalletButton';
import { useJupNexusStore } from '../../store/jupnexus';
import Toast from '../../components/Toast';

// Component that uses useSearchParams - wrapped in its own Suspense
function SearchParamsHandler({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const tab = searchParams.get('tab') || 'popular';
    onTabChange(tab);
  }, [searchParams, onTabChange]);
  
  return null;
}

// Loading component for SearchParams
function SearchParamsLoading() {
  return <div className="hidden">Loading search params...</div>;
}

// Separate component for main content
function ProPageContent() {
  const router = useRouter();
  const { trackActivity } = useJupNexusStore();
  const [activeTab, setActiveTab] = useState('popular');
  const [toast, setToast] = useState<{message: string, type: 'success' | 'info' | 'warning' | 'error'} | null>(null);

  const tabs = [
    { id: 'cooking', label: 'Cooking', icon: '🔥', description: 'Trending tokens with high momentum' },
    { id: 'stocks', label: 'Stocks', icon: '📈', description: 'Tokenized stocks and traditional assets' },
    { id: 'alphascan', label: 'AlphaScan', icon: '🔍', description: 'Advanced token analytics' },
    { id: 'launchpads', label: 'Launchpads', icon: '🚀', description: 'New token launches and IDOs' },
    { id: 'toptraded', label: 'Top Traded', icon: '⚡', description: 'Most actively traded tokens' },
    { id: 'organic', label: 'Organic', icon: '🌱', description: 'Tokens with genuine organic growth' },
    { id: 'popular', label: 'Popular', icon: '⭐', description: 'Trending tokens in the ecosystem' }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab) || tabs[6];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    router.push(`/pro?tab=${tabId}`);
  };

  const simulateTokenAnalysis = async (tokenSymbol: string) => {
    // Show analyzing toast
    setToast({
      message: `🔍 Analyzing ${tokenSymbol}...`,
      type: 'info'
    });

    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Track activity
    await trackActivity('pro_token_analyzed', `analyzed_${tokenSymbol}_${Date.now()}`);

    // Show success toast
    setToast({
      message: `✅ ${tokenSymbol} analysis complete! Check JupNexus widget for suggestions.`,
      type: 'success'
    });
  };

  // Mock token data based on the screenshot
  const mockTokens = [
    { 
      symbol: 'SOL', 
      name: 'Solana', 
      price: '$150.25', 
      change: '+1.14%', 
      volume: '$80.5M', 
      liquidity: '$109M',
      logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
    },
    { 
      symbol: 'GRIF', 
      name: 'Griffin', 
      price: '$0.003061', 
      change: '+7.02%', 
      volume: '$1.30M', 
      liquidity: '$92.4B',
      logo: 'https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains/solana/assets/So11111111111111111111111111111111111111112/logo.png'
    },
    { 
      symbol: 'Loopy', 
      name: 'Loopy', 
      price: '$0.334', 
      change: '+26.06%', 
      volume: '$334B', 
      liquidity: '$38.9B',
      logo: 'https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains/solana/assets/So11111111111111111111111111111111111111112/logo.png'
    },
    { 
      symbol: 'JUP', 
      name: 'Jupiter', 
      price: '$0.43147', 
      change: '%0', 
      volume: '$1.30M', 
      liquidity: '$764M',
      logo: 'https://static.jup.ag/jup/icon.png'
    },
    { 
      symbol: 'MMX', 
      name: 'MMX', 
      price: '$0.16366', 
      change: '+90.94%', 
      volume: '$147B', 
      liquidity: '$18.2B',
      logo: 'https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains/solana/assets/So11111111111111111111111111111111111111112/logo.png'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Search params handler with its own Suspense boundary */}
      <Suspense fallback={<SearchParamsLoading />}>
        <SearchParamsHandler onTabChange={setActiveTab} />
      </Suspense>

      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center overflow-hidden">
                <Image 
                  src="/CattieAI.png" 
                  alt="Cattie AI" 
                  width={24}
                  height={24}
                  className="object-cover rounded-full"
                />
              </div>
              <h1 className="text-xl font-bold">Jupiter Pro Demo</h1>
              <div className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-bold">
                ✨ DEMO
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">
            🔥 Jupiter Pro - Advanced Trading Tools
          </h2>
          <p className="text-gray-300 mb-6">
            This is a Jupiter Pro demo page. JupNexus provides intelligent suggestions based on your Pro activities.
          </p>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Current Tab Info */}
          <div className="bg-gray-700 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-bold text-white mb-2">
              {currentTab.icon} {currentTab.label}
            </h3>
            <p className="text-gray-300 text-sm">{currentTab.description}</p>
          </div>

          {/* Mock Token Table */}
          <div className="bg-gray-700 rounded-lg overflow-hidden">
            <div className="px-4 py-3 bg-gray-600 border-b border-gray-500">
              <h4 className="text-white font-medium">Token List - {currentTab.label}</h4>
            </div>
            <div className="divide-y divide-gray-600">
              {mockTokens.map((token, index) => (
                <div key={index} className="px-4 py-3 hover:bg-gray-600 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center">
                        <Image 
                          src={token.logo} 
                          alt={token.symbol}
                          width={32}
                          height={32}
                          className="object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.parentElement?.querySelector('.fallback-icon') as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <div className="fallback-icon w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{display: 'none'}}>
                          {token.symbol.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-white">{token.symbol}</div>
                        <div className="text-sm text-gray-400">{token.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-white">{token.price}</div>
                      <div className={`text-sm ${token.change.startsWith('+') ? 'text-green-400' : token.change.startsWith('-') ? 'text-red-400' : 'text-gray-400'}`}>
                        {token.change}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Vol: {token.volume}</div>
                      <div className="text-sm text-gray-400">Liq: {token.liquidity}</div>
                    </div>
                    <div>
                      <button
                        onClick={() => simulateTokenAnalysis(token.symbol)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                      >
                        🔍 Analyze
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Demo Instructions */}
          <div className="mt-8 bg-purple-600/20 border border-purple-600 rounded-lg p-4">
            <h3 className="text-purple-200 font-bold mb-2">🎯 Demo Instructions</h3>
            <ul className="text-purple-200 text-sm space-y-1">
              <li>• 🔥 <strong>Tab Navigation</strong> - Switch between different Pro categories</li>
              <li>• 📊 <strong>Token Analysis</strong> - Click &quot;Analyze&quot; to trigger smart suggestions</li>
              <li>• 🤖 <strong>AI Integration</strong> - JupNexus widget provides contextual recommendations</li>
              <li>• 💡 <strong>Real Integration</strong> - In production, this would connect to Jupiter Pro APIs</li>
              <li>• 🎯 Click &quot;Analyze&quot; on any token to see AI suggestions!</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Cattie AI Widget */}
      <JupNexusWidget />
    </div>
  );
}

// Loading component for Suspense fallback
function ProPageLoading() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-pulse"></div>
              <div className="h-6 bg-gray-600 rounded w-32 animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-8 bg-gray-600 rounded w-24 animate-pulse"></div>
              <div className="h-8 bg-gray-600 rounded w-16 animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="h-8 bg-gray-600 rounded w-64 animate-pulse mb-4"></div>
          <div className="h-4 bg-gray-600 rounded w-96 animate-pulse mb-6"></div>
          <div className="flex gap-2 mb-6">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-600 rounded w-24 animate-pulse"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-600 rounded animate-pulse"></div>
        </div>
      </main>
    </div>
  );
}

// Main component with Suspense boundary
export default function ProPage() {
  return (
    <Suspense fallback={<ProPageLoading />}>
      <ProPageContent />
    </Suspense>
  );
} 