import { create } from 'zustand';

interface TabStyle {
  tabColor: string;
  headerColor: string;
}

interface TabState {
  styles: Record<string, TabStyle>;
  setTabStyle: (tabName: string, style: Partial<TabStyle>) => void;
}

export const useTabStore = create<TabState>((set) => ({
  styles: {
    'index': {
      tabColor: '#442800',
      headerColor: '#6B5E31',
    },
    'routines': {
      tabColor: '#030B43',
      headerColor: '#313B6B',
    }
  },

  setTabStyle: (tabName, style) => 
    set(state => ({
      styles: {
        ...state.styles,
        [tabName]: {
          ...state.styles[tabName],
          ...style
        }
      }
    }))
}));