import { create } from 'zustand'

interface LoadingStoreProps {
    loading: LoadingProps,
    setLoading: (loading: LoadingProps) => void
}

interface LoadingProps {
    state: boolean;
}

export const LoadingStore = create<LoadingStoreProps>()(
    set => ({
        loading: null,
        setLoading: (loading: LoadingProps) => {
            set({ loading })
        }
    })
)