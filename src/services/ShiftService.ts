import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShiftStore } from '../zustand/Shift';
import api from './RequestsService';

const setShiftList = () => {
    const { shifts, setShift } = ShiftStore();

    const funnn = async (date: string) => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem('agc_user'));


            api.get(`list-shifts?date=${date}&userId=${user.id}`)
                .then(async (response: any) => {
                    console.log(response);
                    setShift(response.shifts);
                    const data = await response.json();
                })
                .catch((error) => {
                    console.log('error', error);

                })

        } catch (error) {
            throw error; // Você pode escolher lidar com o erro aqui ou deixar que quem chama lide com isso.
        }
    }

    return funnn;
}

export default setShiftList;





