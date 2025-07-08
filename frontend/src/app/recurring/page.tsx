'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import JupNexusWidget from '../../components/JupNexusWidget';
import { WalletButton } from '../../components/WalletButton';

export default function RecurringPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center overflow-hidden">
                <Image 
                  src="/CattieAI.png" 
                  alt="Cattie AI" 
                  width={24}
                  height={24}
                  className="object-cover rounded-full"
                />
              </div>
              <h1 className="text-xl font-bold">Jupiter Recurring (DCA) Demo</h1>
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
          <h2 className="text-2xl font-bold mb-4 text-orange-400">
            🔄 Jupiter Recurring DCA (Dollar Cost Averaging)
          </h2>
          <p className="text-gray-300 mb-6">
            This is a Jupiter Recurring demo page. In the real application, you can set up regular buy/sell strategies here.
          </p>

          {/* Mock DCA Interface */}
          <div className="bg-gray-700 rounded-lg p-6 max-w-md mx-auto">
            <div className="space-y-4">
              {/* Strategy Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Strategy Type
                </label>
                <select className="w-full bg-gray-600 text-white rounded-lg p-3 outline-none">
                  <option>Buy DCA (Regular Buy)</option>
                  <option>Sell DCA (Regular Sell)</option>
                </select>
              </div>

              {/* Token Pair */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Token Pair
                </label>
                <div className="bg-gray-600 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                    <span className="text-white">USDC</span>
                    <span className="text-gray-400">→</span>
                    <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                    <span className="text-white">SOL</span>
                  </div>
                </div>
              </div>

              {/* Amount per Order */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount per Order
                </label>
                <div className="bg-gray-600 rounded-lg p-3">
                  <input 
                    type="text" 
                    placeholder="10.00 USDC" 
                    className="w-full bg-transparent text-white outline-none"
                  />
                </div>
              </div>

              {/* Frequency */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Frequency
                </label>
                <select className="w-full bg-gray-600 text-white rounded-lg p-3 outline-none">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Hourly</option>
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Duration
                </label>
                <div className="bg-gray-600 rounded-lg p-3">
                  <input 
                    type="text" 
                    placeholder="30 days" 
                    className="w-full bg-transparent text-white outline-none"
                  />
                </div>
              </div>

              {/* Create DCA Button */}
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                🔄 Create DCA Strategy (Demo)
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2 text-orange-400">📋 Test Instructions</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Does JupNexus widget show &quot;You&apos;re on DCA page&quot; message?</li>
              <li>• Click on create DCA strategy button</li>
              <li>• Check AI suggestions from widget</li>
              <li>• View suggestions related to other modules</li>
            </ul>
          </div>
        </div>
      </main>

      {/* JupNexus Widget */}
      <JupNexusWidget />
    </div>
  );
} 