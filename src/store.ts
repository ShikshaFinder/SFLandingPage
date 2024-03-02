import {create} from 'zustand'


type Store = {
  selectedIcon: string | null
  setSelectedIcon: (iconName: string | null) => void
}

export const useStore = create<Store>((set) => ({
  selectedIcon: null,
  setSelectedIcon: (iconName) => set(() => ({ selectedIcon: iconName })),
}))