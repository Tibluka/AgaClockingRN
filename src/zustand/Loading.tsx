import { create } from 'zustand'

interface LoadingStoreProps {
    loading: LoadingProps,
    setLoading: (loading: LoadingProps) => void
}

interface LoadingProps {
    state: boolean;
    blockBackground?: boolean;
}

export const LoadingStore = create<LoadingStoreProps>()(
    set => ({
        loading: { state: false, blockBackground: false },
        setLoading: (loading: LoadingProps) => {
            set({ loading })
        }
    })
)