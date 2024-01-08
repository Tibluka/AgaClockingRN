import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/RequestsService';
import { UserStore } from '../zustand/User';

const useUser = () => {
    const { setUser } = UserStore();

    const setLoggedUser = async () => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem('agc_user'));

            api.get(`get-user-by-id?userId=${user.id}`)
                .then(async (response: any) => {
                    console.log(response);
                    setUser(response);
                })
                .catch((error) => {
                    AsyncStorage.clear();
                })

        } catch (error) {
            throw error; // Você pode escolher lidar com o erro aqui ou deixar que quem chama lide com isso.
        }
    }

    return { setLoggedUser };
}

export { useUser };





