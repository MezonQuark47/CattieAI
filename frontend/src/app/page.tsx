'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import JupNexusWidget from '../components/JupNexusWidget';
import { WalletButton } from '../components/WalletButton';

export default function Home() {
  const router = useRouter();

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
              <h1 className="text-xl font-bold">Cattie AI Demo</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Jupiter AI Bridge</span>
              <WalletButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Panel - Açıklama */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4 text-emerald-400">
                🚀 Cattie AI - Jupiter Smart Bridge System
              </h2>
              
              {/* Project Vision */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">🎯 Project Vision</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Jupiter has many incredibly useful modules for the community, but unfortunately, it&apos;s not always clear how to access most of them, even from the menu. 
                  Users of all types - not just pro traders - are now visiting these systems.
                </p>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  With the <strong className="text-emerald-400">Cattie AI widget</strong>, we&apos;ll provide users with an AI-powered system that will be directly integrated into Jupiter and guide users seamlessly. 
                  Through this system, you&apos;ll get a much better understanding of what we want to achieve by experiencing it firsthand.
                </p>
              </div>

              {/* Problem Statement */}
              <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg">
                <h4 className="font-semibold text-red-400 mb-2">⚠️ Current Problem</h4>
                <p className="text-gray-300 text-sm">
                  Users get lost navigating between Jupiter&apos;s powerful modules. Many don&apos;t discover features like Perps, Trigger orders, DCA, or Lending - leading to underutilization of the ecosystem.
                </p>
              </div>

              {/* Solution */}
              <div className="mb-6 p-4 bg-emerald-900/20 border border-emerald-500 rounded-lg">
                <h4 className="font-semibold text-emerald-400 mb-2">✅ Our Solution</h4>
                <p className="text-gray-300 text-sm mb-3">
                  Cattie AI provides contextual AI guidance that appears on every Jupiter page, analyzing user behavior and suggesting the most relevant next steps in their DeFi journey.
                </p>
                <p className="text-gray-300 text-sm">
                  <strong className="text-emerald-300">Key Approach:</strong> We handle all the heavy lifting - database, AI infrastructure, and development. 
                  Jupiter team can integrate our widget whenever they&apos;re ready, and we&apos;ll enhance it based on their specific needs and feedback.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-emerald-400 mb-2">✨ Page-Based Welcome</h3>
                  <p className="text-gray-300 text-sm">
                    Detects which Jupiter page you&apos;re on and shows personalized welcome message.
                  </p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-teal-400 mb-2">🤖 AI-Powered Suggestions</h3>
                  <p className="text-gray-300 text-sm">
                    Provides smart recommendations based on your transactions and guides to other modules.
                  </p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-emerald-400 mb-2">🔗 Smart Bridges</h3>
                  <p className="text-gray-300 text-sm">
                    Intelligent workflows like Swap → Farming, Perps → Risk Management.
                  </p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-teal-400 mb-2">📊 User Profiles</h3>
                  <p className="text-gray-300 text-sm">
                    Personalized experience based on Trader, HODLer, Developer profiles.
                  </p>
                </div>
              </div>
            </div>

            {/* Demo Pages */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-white">🎮 Demo Pages</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => router.push('/swap')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg text-sm font-medium transition-colors relative"
                >
                  🔄 Swap Demo
                  <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1 rounded">
                    REAL
                  </div>
                </button>
                <button 
                  onClick={() => router.push('/pro?tab=cooking')}
                  className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg text-sm font-medium transition-colors relative"
                >
                  🔥 Pro Demo
                  <div className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs px-1 rounded">
                    NEW
                  </div>
                </button>
                <button 
                  onClick={() => router.push('/perps')}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  📈 Perps Demo
                </button>
                <button 
                  onClick={() => router.push('/trigger')}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  🎯 Trigger Demo
                </button>
                <button 
                  onClick={() => router.push('/recurring')}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  🔄 DCA Demo
                </button>
                <button 
                  onClick={() => router.push('/lend')}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  💰 Lend Demo
                </button>
                <button 
                  onClick={() => router.push('/studio')}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  🛠️ Studio Demo
                </button>
              </div>
            </div>

            {/* Development Roadmap */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-white">🗺️ Development Roadmap</h3>
              
              {/* Milestone 1 */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold mr-3">1</div>
                  <h4 className="text-lg font-semibold text-emerald-400">Foundation & Core Widget</h4>
                  <span className="ml-auto text-xs bg-green-600 text-white px-2 py-1 rounded">COMPLETED</span>
                </div>
                <ul className="text-gray-300 text-sm space-y-1 ml-11">
                  <li>✅ Page detection system across all Jupiter modules</li>
                  <li>✅ Contextual welcome messages for each page</li>
                  <li>✅ Basic widget UI/UX integration</li>
                  <li>✅ Real Jupiter API integration (Swap module)</li>
                  <li>✅ Rule-based suggestion engine</li>
                </ul>
              </div>

              {/* Milestone 2 */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">2</div>
                  <h4 className="text-lg font-semibold text-blue-400">AI Integration & Smart Suggestions</h4>
                  <span className="ml-auto text-xs bg-yellow-600 text-white px-2 py-1 rounded">IN PROGRESS</span>
                </div>
                <ul className="text-gray-300 text-sm space-y-1 ml-11">
                  <li>🔄 Advanced AI engine with OpenAI/Claude integration</li>
                  <li>🔄 Transaction pattern analysis</li>
                  <li>🔄 User behavior profiling (Trader/HODLer/Developer)</li>
                  <li>🔄 Dynamic suggestion generation based on context</li>
                  <li>🔄 Cross-module workflow recommendations</li>
                </ul>
              </div>

              {/* Milestone 3 */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">3</div>
                  <h4 className="text-lg font-semibold text-purple-400">Production-Ready Widget System</h4>
                  <span className="ml-auto text-xs bg-gray-600 text-white px-2 py-1 rounded">PLANNED</span>
                </div>
                <ul className="text-gray-300 text-sm space-y-1 ml-11">
                  <li>⏳ Complete backend infrastructure (Database, AI, APIs)</li>
                  <li>⏳ Easy integration package for Jupiter team</li>
                  <li>⏳ Real API integration for all modules (Perps, Trigger, DCA, Lend)</li>
                  <li>⏳ Live transaction monitoring and analysis</li>
                  <li>⏳ Performance optimization for production scale</li>
                </ul>
              </div>

              {/* Milestone 4 */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-3">4</div>
                  <h4 className="text-lg font-semibold text-orange-400">Jupiter Integration & Feedback</h4>
                  <span className="ml-auto text-xs bg-gray-600 text-white px-2 py-1 rounded">PLANNED</span>
                </div>
                <ul className="text-gray-300 text-sm space-y-1 ml-11">
                  <li>⏳ Deploy widget to Jupiter&apos;s production environment</li>
                  <li>⏳ Gather user feedback and usage analytics</li>
                  <li>⏳ Understand Jupiter team&apos;s specific requirements</li>
                  <li>⏳ A/B testing different AI suggestion strategies</li>
                  <li>⏳ Performance monitoring and optimization</li>
                </ul>
              </div>

              {/* Milestone 5 */}
              <div>
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold mr-3">5</div>
                  <h4 className="text-lg font-semibold text-pink-400">Advanced Cattie AI Development</h4>
                  <span className="ml-auto text-xs bg-gray-600 text-white px-2 py-1 rounded">FUTURE</span>
                </div>
                <ul className="text-gray-300 text-sm space-y-1 ml-11">
                  <li>⏳ Enhanced features based on Jupiter team feedback</li>
                  <li>⏳ Advanced AI models with learning capabilities</li>
                  <li>⏳ Personalized dashboard and analytics</li>
                  <li>⏳ Multi-language support and accessibility</li>
                  <li>⏳ Extended ecosystem integrations as requested</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Panel - System Status */}
          <div className="space-y-6">
            {/* System Status */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-white">📊 System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Backend API</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-400 text-sm">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Jupiter API</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-400 text-sm">Connected</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Real Integration</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-400 text-sm">Swap ✅</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">AI Engine</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-yellow-400 text-sm">Rule-Based</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-white">🚀 Integration Status</h3>
                             <div className="space-y-2 text-sm">
                 <div className="flex items-center space-x-2">
                   <span className="text-green-400">✅</span>
                   <span className="text-white font-medium">Swap Page</span>
                   <span className="text-gray-400">- Real Jupiter API</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <span className="text-green-400">✅</span>
                   <span className="text-white font-medium">Pro Pages</span>
                   <span className="text-gray-400">- All 7 tabs integrated</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <span className="text-yellow-400">🔄</span>
                   <span className="text-gray-400">Perps - Demo Mode</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <span className="text-yellow-400">🔄</span>
                   <span className="text-gray-400">Trigger - Demo Mode</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <span className="text-yellow-400">🔄</span>
                   <span className="text-gray-400">Recurring - Demo Mode</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <span className="text-yellow-400">🔄</span>
                   <span className="text-gray-400">Lend - Demo Mode</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <span className="text-yellow-400">🔄</span>
                   <span className="text-gray-400">Studio - Demo Mode</span>
                 </div>
               </div>
                              <div className="mt-3 p-2 bg-emerald-600/20 rounded border border-emerald-600">
                  <p className="text-emerald-200 text-xs">
                    <strong>Live Demo:</strong> Swap shows real Jupiter integration. Other modules will be integrated similarly when system is deployed to Jupiter ecosystem.
                  </p>
                </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-white">🎯 How to Test?</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start space-x-2">
                  <span className="text-emerald-400">1.</span>
                  <span>Click on <strong>&quot;Swap Demo&quot;</strong> button (has real Jupiter API)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-emerald-400">2.</span>
                  <span>Connect your wallet using the wallet button</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-emerald-400">3.</span>
                  <span>Enter amounts to get real Jupiter quotes</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-emerald-400">4.</span>
                  <span>Click <strong>&quot;Simulate Swap&quot;</strong> to trigger AI suggestions</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-emerald-400">5.</span>
                  <span>Check the Cattie AI widget for smart suggestions!</span>
                </div>
              </div>
            </div>

            {/* Back to Home Button */}
            <div className="bg-gray-800 rounded-lg p-6">
              <button 
                onClick={() => router.push('/')}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
              >
                🏠 Back to Home
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Cattie AI Widget */}
      <JupNexusWidget />
    </div>
  );
}
