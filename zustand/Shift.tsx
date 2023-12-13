import { create } from 'zustand'

interface ShiftStoreProps {
    shifts: Array<ShiftProps | null>,
    setShift: (shifts: Array<ShiftProps>) => void
}

interface ShiftProps {
    _id: {
        $oid: string
    },
    activity: string,
    endShift: Date,
    finished: boolean,
    overnight: boolean,
    project: string,
    startShift: Date,
    total: string,
    totalTimeInMinutes: number,
    userId: string
}

export const ShiftStore = create<ShiftStoreProps>()(
    set => ({
        shifts: null,
        setShift: (shifts: Array<ShiftProps>) => {
            set({ shifts })
        }
    })
)