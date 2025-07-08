'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import JupNexusWidget from '../../components/JupNexusWidget';
import { WalletButton } from '../../components/WalletButton';

export default function LendPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-pink-600 rounded-full flex items-center justify-center overflow-hidden">
                <Image 
                  src="/CattieAI.png" 
                  alt="Cattie AI" 
                  width={24}
                  height={24}
                  className="object-cover rounded-full"
                />
              </div>
              <h1 className="text-xl font-bold">Jupiter Lend Demo</h1>
            </div>
            <div className="flex items-center space-x-4">
              <WalletButton />
              <button 
                onClick={() => router.push('/')}
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
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
          <h2 className="text-2xl font-bold mb-4 text-red-400">
            💰 Jupiter Lending & Borrowing
          </h2>
          <p className="text-gray-300 mb-6">
            This is a Jupiter Lend demo page. In the real application, you can lend your tokens or borrow assets here.
          </p>

          {/* Mock Lend Interface */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lend Section */}
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-green-400">🏦 Lend</h3>
              <div className="space-y-4">
                {/* Token to Lend */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Token to Lend
                  </label>
                  <div className="bg-gray-600 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                      <span className="text-white">USDC</span>
                    </div>
                    <span className="text-green-400">5.2% APY</span>
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Amount
                  </label>
                  <div className="bg-gray-600 rounded-lg p-3">
                    <input 
                      type="text" 
                      placeholder="100.00 USDC" 
                      className="w-full bg-transparent text-white outline-none"
                    />
                  </div>
                </div>

                {/* Lend Button */}
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                  💰 Lend (Demo)
                </button>
              </div>
            </div>

            {/* Borrow Section */}
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-orange-400">🏦 Borrow</h3>
              <div className="space-y-4">
                {/* Collateral */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Collateral Token
                  </label>
                  <div className="bg-gray-600 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                      <span className="text-white">SOL</span>
                    </div>
                    <span className="text-gray-400">75% LTV</span>
                  </div>
                </div>

                {/* Borrow Token */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Token to Borrow
                  </label>
                  <div className="bg-gray-600 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                      <span className="text-white">USDC</span>
                    </div>
                    <span className="text-red-400">7.8% APR</span>
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Borrow Amount
                  </label>
                  <div className="bg-gray-600 rounded-lg p-3">
                    <input 
                      type="text" 
                      placeholder="75.00 USDC" 
                      className="w-full bg-transparent text-white outline-none"
                    />
                  </div>
                </div>

                {/* Borrow Button */}
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                  🏦 Borrow (Demo)
                </button>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2 text-red-400">📋 Test Instructions</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Does JupNexus widget show &quot;You&apos;re on Lending page&quot; message?</li>
              <li>• Click on either Lend or Borrow button</li>
              <li>• Check AI suggestions from widget</li>
              <li>• View collateral optimization suggestions</li>
            </ul>
          </div>
        </div>
      </main>

      {/* JupNexus Widget */}
      <JupNexusWidget />
    </div>
  );
} 