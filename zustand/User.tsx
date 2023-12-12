import { create } from 'zustand'

interface UserStoreProps {
    user: UserProps | null,
    setUser: (user: UserProps) => void
}

interface UserProps {
    id: string,
    name: string,
    userType: string
}

export const UserStore = create<UserStoreProps>()(
    set => ({
        user: null,
        setUser: (user: UserProps) => {
            set({ user })
        }
    })
)