import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { styles } from './Home.styles';
import SvgUri from 'react-native-svg-uri';
import NewShift from '../../components/NewShift/NewShift';

const Home = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [shifts, setShifts] = useState([]);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        const fetchShifts = async () => {
            try {
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJMdWNhcyBHb21lcyIsInVzZXJUeXBlIjoiQURNSU4iLCJfaWQiOiI2MzZlNDNiMWVkOTVmYzgwODcyYTdiM2EifSwiZXhwaXJhdGlvbiI6IjIwMjMtMTItMTEgMDM6NTQ6MTkuOTA3OTYzIn0.7hqOKlD5iR8dlq9dosimgh-DaiFA2GueuYCxm4uZOGk';

                const response = await fetch(
                    'https://agaclocking.onrender.com/list-shifts?date=2023-12-10&userId=636e43b1ed95fc80872a7b3a',
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
    }, []);

    return (
        <View style={styles.container}>
            <Text>Home</Text>

            <TouchableOpacity style={styles.button} onPress={openModal}>
                <SvgUri
                    style={styles.menuSvgIcon}
                    source={require('../../assets/icon/add-shift.svg')}
                />
            </TouchableOpacity>

            <Text>Lista de Turnos:</Text>
            {
                (shifts && shifts.length > 0) ? shifts.map((shift) => (
                    <View key={shift._id.$oid}>
                        <Text>{shift.activity}</Text>
                    </View>
                )) :
                    <View>
                        <Text>Nao tem shift</Text>
                    </View>
            }

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
