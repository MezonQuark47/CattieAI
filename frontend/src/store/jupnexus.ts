import { create } from 'zustand';

interface Suggestion {
  type: 'primary' | 'secondary' | 'tertiary';
  title: string;
  description: string;
  icon: string;
  url: string;
  priority: number;
}

interface JupNexusState {
  // Sayfa bilgileri
  currentPage: string;
  welcomeMessage: string;
  
  // Kullanıcı bilgileri
  walletAddress: string | null;
  userProfile: {
    type: 'trader' | 'hodler' | 'developer' | 'new_user';
    activityCount: number;
    lastActivity: string | null;
  };
  
  // AI suggestions
  suggestions: Suggestion[];
  isLoadingSuggestions: boolean;
  
  // UI durumu
  isWidgetVisible: boolean;
  isExpanded: boolean;
  
  // Actions
  setCurrentPage: (page: string) => void;
  setWelcomeMessage: (message: string) => void;
  setWalletAddress: (address: string | null) => void;
  setSuggestions: (suggestions: Suggestion[]) => void;
  setIsLoadingSuggestions: (loading: boolean) => void;
  toggleWidget: () => void;
  toggleExpanded: () => void;
  trackActivity: (actionType: string, transactionSignature?: string) => void;
}

export const useJupNexusStore = create<JupNexusState>((set, get) => ({
  // Initial state
  currentPage: 'unknown',
  welcomeMessage: '',
  walletAddress: null,
  userProfile: {
    type: 'new_user',
    activityCount: 0,
    lastActivity: null,
  },
  suggestions: [],
  isLoadingSuggestions: false,
  isWidgetVisible: true,
  isExpanded: false,
  
  // Actions
  setCurrentPage: (page) => set({ currentPage: page }),
  setWelcomeMessage: (message) => set({ welcomeMessage: message }),
  setWalletAddress: (address) => set({ walletAddress: address }),
  setSuggestions: (suggestions) => set({ suggestions }),
  setIsLoadingSuggestions: (loading) => set({ isLoadingSuggestions: loading }),
  toggleWidget: () => set((state) => ({ isWidgetVisible: !state.isWidgetVisible })),
  toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
  
  trackActivity: async (actionType, transactionSignature) => {
    const { walletAddress, currentPage } = get();
    
    try {
      // Backend'e aktivite gönder
      await fetch('http://localhost:3001/api/track-activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress,
          pageType: currentPage,
          actionType,
          transactionSignature,
        }),
      });
      
      // Kullanıcı profili güncelle
      set((state) => ({
        userProfile: {
          ...state.userProfile,
          activityCount: state.userProfile.activityCount + 1,
          lastActivity: new Date().toISOString(),
        },
      }));
    } catch (error) {
      console.error('Aktivite kaydedilemedi:', error);
    }
  },
})); 