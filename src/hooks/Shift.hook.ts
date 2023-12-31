import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';
import { Alert } from 'react-native';
import api from '../services/RequestsService';
import { ShiftStore } from '../zustand/Shift';
import { UserStore } from '../zustand/User';

const useShift = () => {
    const { setShift } = ShiftStore();
    const { setUser } = UserStore();

    const setShiftList = async (date: string) => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem('agc_user'));

            api.get(`list-shifts?date=${date}&userId=${user.id}`)
                .then(async (response: any) => {
                    const shifts = await response.data.shifts;
                    setShift(shifts);
                })
                .catch((error: AxiosError) => {
                    if (error.toJSON()['status'] === 401) {
                        Alert.alert('Token inválido', 'Token expirado. Faça o login novamente.')
                        setUser(null);
                    }
                })

        } catch (error) {

        }
    }

    return { setShiftList };
}

export { useShift };





