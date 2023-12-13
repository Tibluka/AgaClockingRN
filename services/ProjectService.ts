import AsyncStorage from '@react-native-async-storage/async-storage';

const setProjectList = async () => {
    try {
        const agc_token = await AsyncStorage.getItem('agc_token');
        const response = await fetch(`https://agaclocking.onrender.com/list-projects`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${agc_token}`
            }
        });
        const data = await response.json();
        return data.projects;
    } catch (error) {
        throw error; // Você pode escolher lidar com o erro aqui ou deixar que quem chama lide com isso.
    }
}

export const projectService = {
    setProjectList
};





