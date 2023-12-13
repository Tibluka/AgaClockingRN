import AsyncStorage from '@react-native-async-storage/async-storage';

const setShiftList = async (date: string) => {
    try {
        const agc_token = await AsyncStorage.getItem('agc_token');
        const user = JSON.parse(await AsyncStorage.getItem('agc_user'));
        const response = await fetch(`https://agaclocking.onrender.com/list-shifts?date=${date}&userId=${user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${agc_token}`
            }
        });

        const data = await response.json();

        return data.shifts;

    } catch (error) {

        throw error; // Você pode escolher lidar com o erro aqui ou deixar que quem chama lide com isso.
    }
}

export const shiftService = {
    setShiftList
};





