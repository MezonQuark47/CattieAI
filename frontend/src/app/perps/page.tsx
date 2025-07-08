'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import JupNexusWidget from '../../components/JupNexusWidget';
import { WalletButton } from '../../components/WalletButton';

export default function PerpsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full flex items-center justify-center overflow-hidden">
                <Image 
                  src="/CattieAI.png" 
                  alt="Cattie AI" 
                  width={24}
                  height={24}
                  className="object-cover rounded-full"
                />
              </div>
              <h1 className="text-xl font-bold">Jupiter Perps Demo</h1>
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
          <h2 className="text-2xl font-bold mb-4 text-teal-400">
            📈 Jupiter Perpetuals Trading
          </h2>
          <p className="text-gray-300 mb-6">
            This is a Jupiter Perpetuals demo page. In the real application, you can trade with leverage here.
          </p>

          {/* Mock Perps Interface */}
          <div className="bg-gray-700 rounded-lg p-6 max-w-md mx-auto">
            <div className="space-y-4">
              {/* Market Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Market
                </label>
                <div className="bg-gray-600 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                    <span className="text-white">SOL-PERP</span>
                  </div>
                  <span className="text-green-400">$152.43</span>
                </div>
              </div>

              {/* Position Size */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Position Size
                </label>
                <div className="bg-gray-600 rounded-lg p-3">
                  <input 
                    type="text" 
                    placeholder="0.00 SOL" 
                    className="w-full bg-transparent text-white outline-none"
                  />
                </div>
              </div>

              {/* Leverage */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Leverage
                </label>
                <div className="bg-gray-600 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white">5x</span>
                    <input 
                      type="range" 
                      min="1" 
                      max="20" 
                      defaultValue="5"
                      className="flex-1 mx-4"
                    />
                    <span className="text-white">20x</span>
                  </div>
                </div>
              </div>

              {/* Long/Short Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                  📈 Long (Demo)
                </button>
                <button className="bg-emerald-800 hover:bg-emerald-900 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                  📉 Short (Demo)
                </button>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2 text-green-400">📋 Test Instructions</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Does JupNexus widget show &quot;You&apos;re on Perps page&quot; message?</li>
              <li>• Click on one of the Long/Short buttons</li>
              <li>• Check AI suggestions from widget</li>
              <li>• View risk management suggestions</li>
            </ul>
          </div>
        </div>
      </main>

      {/* JupNexus Widget */}
      <JupNexusWidget />
    </div>
  );
} 