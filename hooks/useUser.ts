"use client"
import { create } from 'zustand';
import { Users } from '@/interfaces/interface';

interface useUserStoreProps {
    currentUser: Users | null;
    onChange: (user: Users) => void;
    onRemove: () => void
}

export const useUserStore = create<useUserStoreProps>((set) => ({
    currentUser: null,
    onChange: (user) => set(() => ({ currentUser: user })),
    onRemove: () => set(() => ({currentUser: null})),
}))


//LOADING STATE STORE
type LoadingState = {
    Loading: boolean;
}
type LoadingAction = {
    onLoading: () => void
    notLoading: () => void
}

export const useLoadingStore = create<LoadingState & LoadingAction>((set) => ({
    Loading: false,
    onLoading: () => set({ Loading: true }),
    notLoading: () => set({ Loading: false })
}))