'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import JupNexusWidget from '../../components/JupNexusWidget';
import { WalletButton } from '../../components/WalletButton';

export default function StudioPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-slate-600 rounded-full flex items-center justify-center overflow-hidden">
                <Image 
                  src="/CattieAI.png" 
                  alt="Cattie AI" 
                  width={24}
                  height={24}
                  className="object-cover rounded-full"
                />
              </div>
              <h1 className="text-xl font-bold">Jupiter Studio Demo</h1>
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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-400">
            🛠️ Jupiter Studio - Developer Tools
          </h2>
          <p className="text-gray-300 mb-6">
            This is a Jupiter Studio demo page. In the real application, you can find API documentation, developer tools, and integration guides here.
          </p>

          {/* Developer Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* API Documentation */}
            <div className="bg-gray-700 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">📚</span>
                <h3 className="text-lg font-bold text-blue-400">API Documentation</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Integrate swap, DCA, and other operations using Jupiter APIs.
              </p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                📖 View Documentation
              </button>
            </div>

            {/* Code Examples */}
            <div className="bg-gray-700 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">💻</span>
                <h3 className="text-lg font-bold text-green-400">Code Examples</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Ready-to-use code examples and SDKs in JavaScript, Python, and Rust.
              </p>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                🔧 Explore Examples
              </button>
            </div>

            {/* API Keys */}
            <div className="bg-gray-700 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🔑</span>
                <h3 className="text-lg font-bold text-purple-400">API Key Management</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Create and manage your API keys. Rate limiting and usage statistics.
              </p>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                🔐 Create API Key
              </button>
            </div>

            {/* Webhook Integration */}
            <div className="bg-gray-700 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🔗</span>
                <h3 className="text-lg font-bold text-orange-400">Webhook Integration</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Receive automatic notifications when transactions complete. Real-time event handling.
              </p>
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                🔔 Setup Webhook
              </button>
            </div>

            {/* Testing Tools */}
            <div className="bg-gray-700 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🧪</span>
                <h3 className="text-lg font-bold text-yellow-400">Testing Tools</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Sandbox environment, mock data, and API endpoint testing tools.
              </p>
              <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                🔬 Test Environment
              </button>
            </div>

            {/* Community & Support */}
            <div className="bg-gray-700 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🤝</span>
                <h3 className="text-lg font-bold text-pink-400">Community & Support</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Developer Discord, forum, and technical support channels.
              </p>
              <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                💬 Join Discord
              </button>
            </div>
          </div>

          {/* Quick Start Guide */}
          <div className="bg-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4 text-white">🚀 Quick Start Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-400 mb-2">1. Get API Key</h4>
                <p className="text-gray-300 text-sm mb-3">
                  Create an account and get your API key. Rate limiting: 1000 req/min.
                </p>
                
                <h4 className="font-semibold text-green-400 mb-2">2. Install SDK</h4>
                <div className="bg-gray-800 rounded p-2 mb-3">
                  <code className="text-green-400 text-sm">npm install @jup-ag/api</code>
                </div>
                
                <h4 className="font-semibold text-purple-400 mb-2">3. First Swap</h4>
                <div className="bg-gray-800 rounded p-2">
                  <code className="text-purple-400 text-sm">
                    const quote = await jupiterApi.getQuote(...)
                  </code>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-orange-400 mb-2">Popular Endpoints</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <code className="text-blue-400">/quote</code> - Swap price quote</li>
                  <li>• <code className="text-green-400">/swap</code> - Execute transaction</li>
                  <li>• <code className="text-purple-400">/tokens</code> - Token list</li>
                  <li>• <code className="text-orange-400">/price</code> - Price information</li>
                </ul>
                
                <h4 className="font-semibold text-yellow-400 mb-2 mt-4">Support Channels</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Discord: #developer-support</li>
                  <li>• Email: dev@jup.ag</li>
                  <li>• Docs: docs.jup.ag</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2 text-gray-400">📋 Test Instructions</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Does JupNexus widget show &quot;You&apos;re on Studio page&quot; message?</li>
              <li>• Click on any developer tool button</li>
              <li>• Check AI suggestions from widget</li>
              <li>• View community and API documentation suggestions</li>
            </ul>
          </div>
        </div>
      </main>

      {/* JupNexus Widget */}
      <JupNexusWidget />
    </div>
  );
} 