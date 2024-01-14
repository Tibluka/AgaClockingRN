import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';
import { Alert } from 'react-native';
import api from '../services/RequestsService';
import { LoadingStore } from '../zustand/Loading';
import { ShiftStore } from '../zustand/Shift';
import { UserStore } from '../zustand/User';

const useShift = () => {
    const { setShift } = ShiftStore();
    const { setUser } = UserStore();
    const { setLoading } = LoadingStore();


    const setShiftList = async (date: string) => {

        try {
             setLoading({ state: true, blockBackground: false });
            const user = JSON.parse(await AsyncStorage.getItem('agc_user'));

            api.get(`list-shifts?date=${date}&userId=${user.id}`)
                .then(async (response: any) => {
                    const shifts = await response.data.shifts;
                    setShift(shifts);
                    setLoading({ state: false, blockBackground: false });
                })
                .catch((error: AxiosError) => {
                     setLoading({ state: false, blockBackground: false });

                    if (error.toJSON()['status'] === 401) {
                        Alert.alert('Token inválido', 'Token expirado. Faça o login novamente.')
                        setUser(null);
                        AsyncStorage.clear();
                    }
                })

        } catch (error) {

        }
    }

    const initiateShift = async (payload) => {
        try {
            setLoading({ state: true, blockBackground: true });

            api.post(`initiate-shift`, payload)
                .then(async (response: any) => {
                    const shifts = await response.data.shifts;
                    setShift(shifts);
                    setLoading({ state: false, blockBackground: true });
                })
                .catch((error: AxiosError) => {
                    setLoading({ state: false, blockBackground: true });
                    if (error.toJSON()['status'] === 401) {
                        Alert.alert('Token inválido', 'Token expirado. Faça o login novamente.')
                        setUser(null);
                        AsyncStorage.clear();
                    }
                })

        } catch (error) {

        }
    }

    const updateShift = async (payload) => {
        try {
            setLoading({ state: true, blockBackground: true });
            api.post(`update-shift`, payload)
                .then(async (response: any) => {
                    const shifts = await response.data.shifts;
                    setShift(shifts);
                    setLoading({ state: false, blockBackground: true });
                })
                .catch((error: AxiosError) => {
                    setLoading({ state: false, blockBackground: true });
                    if (error.toJSON()['status'] === 401) {
                        Alert.alert('Token inválido', 'Token expirado. Faça o login novamente.')
                        setUser(null);
                        AsyncStorage.clear();
                    }
                })

        } catch (error) {

        }
    }

    const deleteShift = async (payload) => {
        try {
            setLoading({ state: true, blockBackground: true });
            api.post(`delete-shift`, payload)
                .then(async (response: any) => {
                    const shifts = await response.data.shifts;
                    setShift(shifts);
                    setLoading({ state: false, blockBackground: true });
                })
                .catch((error: AxiosError) => {
                    setLoading({ state: false, blockBackground: true });
                    if (error.toJSON()['status'] === 401) {
                        Alert.alert('Token inválido', 'Token expirado. Faça o login novamente.')
                        setUser(null);
                        AsyncStorage.clear();
                    }
                })

        } catch (error) {

        }
    }

    return { setShiftList, initiateShift, updateShift, deleteShift };
}

export { useShift };





