import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View, Image } from 'react-native';
import NewShift from '../../components/NewShift/NewShift';
import { UserStore } from '../../zustand/User';
import { styles } from './Home.styles';
import 'moment/locale/pt-br'; // Importa a localização para português do Brasil


const Home = () => {
    moment.locale('pt-br'); // Define a localização como português do Brasil

    const [modalVisible, setModalVisible] = useState(false);
    const [shifts, setShifts] = useState([]);
    const currentDate = moment().format('YYYY-MM-DD');


    const { user } = UserStore();

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        const fetchShifts = async () => {
            try {
                const token = await AsyncStorage.getItem('agc_token');

                const response = await fetch(
                    `https://agaclocking.onrender.com/list-shifts?date=${moment(currentDate).format('YYYY-MM-DD')}&userId=${user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.statusText}`);
                }
                const data = await response.json();

                setShifts(data.shifts);
            } catch (error) {
                console.error('Erro ao buscar shifts:', error);
            }
        };

        fetchShifts();
        console.log(user);

    }, [user]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{moment(currentDate).format('ddd DD/MM/YYYY')}</Text>

            {
                (shifts && shifts.length > 0) ? shifts.map((shift, index) => (
                    <View style={styles.shift} key={shift._id.$oid}>
                        <Text>{shift.project}</Text>
                    </View>
                )) :
                    <View>
                        <Text>Nenhum turno registrado</Text>
                    </View>
            }

            <TouchableOpacity style={styles.button} onPress={openModal}>
                <Image
                    source={require('../../assets/icon/add-shift.png')}
                />
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <NewShift />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Home;
