import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useJupNexusStore } from '../store/jupnexus';

export const usePageDetection = () => {
  const pathname = usePathname();
  const { setCurrentPage, setWelcomeMessage } = useJupNexusStore();

  useEffect(() => {
    const detectPage = async () => {
      const path = pathname;
      const url = window.location.href;

      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
        // Backend'e sayfa bilgisi gönder
        const response = await fetch(`${backendUrl}/api/detect-page`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url, path }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        setCurrentPage(data.pageType);
        setWelcomeMessage(data.welcomeMessage);
      } catch (error) {
        console.error('Failed to detect page:', error);
        
        // Fallback - client-side detection
        let pageType = 'unknown';
        let welcomeMessage = '';
        
        if (path.includes('swap') || path === '/') {
          pageType = 'swap';
          welcomeMessage = 'Welcome to Jupiter Swap! Here you can instantly trade between 600+ tokens.';
        } else if (path.includes('perps')) {
          pageType = 'perps';
          welcomeMessage = 'You\'re on Perpetual trading page. Open leveraged positions here.';
        } else if (path.includes('trigger')) {
          pageType = 'trigger';
          welcomeMessage = 'You\'re on Limit order page. Create conditional orders here.';
        } else if (path.includes('recurring')) {
          pageType = 'recurring';
          welcomeMessage = 'You\'re on DCA page. Set up recurring buy/sell strategies.';
        } else if (path.includes('lend')) {
          pageType = 'lend';
          welcomeMessage = 'You\'re on Lending page. Lend your tokens or borrow assets.';
        } else if (path.includes('studio')) {
          pageType = 'studio';
          welcomeMessage = 'You\'re on Studio page. API documentation and developer tools available.';
        } else if (path.includes('pro')) {
          const urlParams = new URLSearchParams(window.location.search);
          const tab = urlParams.get('tab') || 'popular';
          pageType = `pro_${tab}`;
          welcomeMessage = `You're on Jupiter Pro - ${tab} section. Advanced trading tools and analytics.`;
        }
        
        setCurrentPage(pageType);
        setWelcomeMessage(welcomeMessage);
      }
    };

    detectPage();
  }, [pathname, setCurrentPage, setWelcomeMessage]); // pathname değiştiğinde tetiklenir
}; 