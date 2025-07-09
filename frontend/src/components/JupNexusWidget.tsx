'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useWallet } from '@solana/wallet-adapter-react';
import { useJupNexusStore } from '../store/jupnexus';
import { usePageDetection } from '../hooks/usePageDetection';

export default function JupNexusWidget() {
  const { connected, publicKey } = useWallet();
  const {
    currentPage,
    welcomeMessage,
    suggestions,
    isLoadingSuggestions,
    isWidgetVisible,
    isExpanded,
    toggleWidget,
    toggleExpanded,
    setSuggestions,
    setIsLoadingSuggestions,
    setWalletAddress,
  } = useJupNexusStore();

  // Sayfa algılama hook'unu kullan
  usePageDetection();

  // Wallet durumunu store'a kaydet
  useEffect(() => {
    if (connected && publicKey) {
      setWalletAddress(publicKey.toString());
    } else {
      setWalletAddress(null);
    }
  }, [connected, publicKey, setWalletAddress]);

  // Fetch AI suggestions
  const fetchSuggestions = async (actionType: string) => {
    setIsLoadingSuggestions(true);
    
    try {
      // Environment variable kontrolü
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      
      if (!backendUrl) {
        console.warn('NEXT_PUBLIC_BACKEND_URL environment variable is not set, using fallback');
        throw new Error('Backend URL not configured');
      }

      console.log('Fetching suggestions from backend:', backendUrl);
      
      const response = await fetch(`${backendUrl}/api/ai-suggestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          actionType,
          currentPage,
          userProfile: { type: 'new_user' },
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Suggestions response:', data);
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error('Failed to fetch AI suggestions:', error);
      // Fallback mock suggestions for demo
      setSuggestions([
        {
          icon: '🎯',
          title: 'Demo Suggestion',
          description: 'Backend connection failed. This is a demo suggestion.',
          type: 'primary',
          url: '/swap',
          priority: 1
        }
      ]);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  // Clear suggestions when page changes
  useEffect(() => {
    setSuggestions([]);
  }, [currentPage, setSuggestions]);

  if (!isWidgetVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Action Button */}
      {!isExpanded && (
        <div className="relative group">
          {/* Animated Background Circles */}
          <div className="absolute inset-0 -m-2">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-20 animate-ping"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-30 animate-ping animation-delay-200"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-40 animate-ping animation-delay-400"></div>
          </div>
          
          {/* Main Button */}
          <button
            onClick={toggleExpanded}
            className="relative w-20 h-20 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center overflow-hidden"
          >
            <Image 
              src="/CattieAI.png" 
              alt="Cattie AI" 
              width={80}
              height={80}
              className="object-cover rounded-full"
            />
          </button>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg border border-gray-700">
              Hey, welcome to Jupiter Universe! 🚀
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>
      )}

      {/* Expanded Widget Panel */}
      {isExpanded && (
        <div className="w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center overflow-hidden">
                  <Image 
                    src="/CattieAI.png" 
                    alt="Cattie AI" 
                    width={24}
                    height={24}
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Cattie AI</h3>
                  <p className="text-emerald-200 text-xs">Smart Assistant</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={toggleExpanded}
                  className="text-white hover:text-emerald-200 transition-colors p-1 rounded"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button
                  onClick={toggleWidget}
                  className="text-white hover:text-emerald-200 transition-colors p-1 rounded"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  </button>
              </div>
            </div>
          </div>

        {/* Content */}
        <div className="p-4">
          {/* Welcome message */}
          <div className="mb-4">
            <p className="text-gray-300 text-sm leading-relaxed">
              {welcomeMessage || 'Your Cattie AI Assistant is ready!'}
            </p>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  currentPage === 'unknown' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
                <span className={`text-xs ${
                  currentPage === 'unknown' ? 'text-yellow-400' : 'text-green-400'
                }`}>
                  {currentPage === 'unknown' ? 'Detecting page...' : `On ${currentPage} page`}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  connected ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className={`text-xs ${
                  connected ? 'text-green-400' : 'text-red-400'
                }`}>
                  {connected ? 'Wallet connected' : 'No wallet'}
                </span>
              </div>
            </div>
          </div>

          {/* Expanded content */}
          {isExpanded && (
            <div className="space-y-4">
              {/* Swap için test butonu */}
              {currentPage === 'swap' && (
                <div className="border-t border-gray-700 pt-4">
                  <div className="bg-emerald-600/20 border border-emerald-600 rounded-lg p-3 mb-3">
                    <p className="text-emerald-200 text-xs">
                      <strong>Real Integration:</strong> Use the swap form on the left to get real quotes and simulate transactions!
                    </p>
                  </div>
                  <button
                    onClick={() => fetchSuggestions('swap_completed')}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
                    🔄 Test: Simulate Swap Transaction
                  </button>
                </div>
              )}

              {/* Perps için test butonu */}
              {currentPage === 'perps' && (
                <div className="border-t border-gray-700 pt-4">
                  <button
                    onClick={() => fetchSuggestions('perp_opened')}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
                    📈 Test: Simulate Perp Position
                  </button>
                </div>
              )}

              {/* Trigger için test butonu */}
              {currentPage === 'trigger' && (
                <div className="border-t border-gray-700 pt-4">
                  <button
                    onClick={() => fetchSuggestions('trigger_created')}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
                    🎯 Test: Simulate Trigger Order
                  </button>
                </div>
              )}

              {/* Recurring için test butonu */}
              {currentPage === 'recurring' && (
                <div className="border-t border-gray-700 pt-4">
                  <button
                    onClick={() => fetchSuggestions('dca_created')}
                    className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
                    🔄 Test: Simulate DCA Strategy
                  </button>
                </div>
              )}

              {/* Lend için test butonu */}
              {currentPage === 'lend' && (
                <div className="border-t border-gray-700 pt-4">
                  <button
                    onClick={() => fetchSuggestions('lend_deposit')}
                    className="w-full bg-emerald-800 hover:bg-emerald-900 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
                    💰 Test: Simulate Lend Transaction
                  </button>
                </div>
              )}

              {/* Studio için test butonu */}
              {currentPage === 'studio' && (
                <div className="border-t border-gray-700 pt-4">
                  <button
                    onClick={() => fetchSuggestions('api_key_created')}
                    className="w-full bg-slate-600 hover:bg-slate-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
                    🛠️ Test: Simulate API Key Creation
                  </button>
                </div>
              )}

              {/* Pro için test butonu */}
              {currentPage.startsWith('pro_') && (
                <div className="border-t border-gray-700 pt-4">
                  <div className="bg-purple-600/20 border border-purple-600 rounded-lg p-3 mb-3">
                    <p className="text-purple-200 text-xs">
                      <strong>Jupiter Pro Integration:</strong> Click &quot;Analyze&quot; on any token in the table to get smart trading suggestions!
                    </p>
                  </div>
                  <button
                    onClick={() => fetchSuggestions('pro_token_analyzed')}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
                    🔍 Test: Simulate Token Analysis
                  </button>
                </div>
              )}

              {/* AI Suggestions */}
              {isLoadingSuggestions ? (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500"></div>
                  <span className="ml-2 text-gray-400 text-sm">Loading AI suggestions...</span>
                </div>
              ) : suggestions.length > 0 ? (
                <div className="space-y-3">
                  <h4 className="text-white font-medium text-sm">🎯 Suggestions:</h4>
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 rounded-lg p-3 hover:bg-gray-750 transition-colors cursor-pointer"
                      onClick={() => {
                        // In real app, this will redirect to Jupiter page
                        alert(`${suggestion.title} suggestion clicked!\n\nIn real app, you would be redirected to ${suggestion.url} page.`);
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-lg">{suggestion.icon}</span>
                        <div className="flex-1">
                          <h5 className="text-white font-medium text-sm">{suggestion.title}</h5>
                          <p className="text-gray-400 text-xs mt-1">{suggestion.description}</p>
                        </div>
                        <div className="text-emerald-400 text-xs">
                          {suggestion.type === 'primary' && '⭐'}
                          {suggestion.type === 'secondary' && '💡'}
                          {suggestion.type === 'tertiary' && '📝'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 text-sm">
                    {currentPage === 'unknown' 
                      ? 'Detecting page...' 
                      : 'No suggestions yet. Make a transaction!'
                    }
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

          {/* Footer */}
          <div className="bg-gray-800 px-4 py-2 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-xs">
                Jupiter Ecosystem
              </span>
              <div className="flex space-x-1">
                <button className="text-gray-500 hover:text-white text-xs px-2 py-1 rounded">
                  ⚙️
                </button>
                <button className="text-gray-500 hover:text-white text-xs px-2 py-1 rounded">
                  📊
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 