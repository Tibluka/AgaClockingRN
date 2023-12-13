import moment from 'moment';
import 'moment/locale/pt-br'; // Importa a localização para português do Brasil
import React, { useEffect, useState } from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import NewShift from '../../components/NewShift/NewShift';
import { shiftService } from '../../services/ShiftService';
import { UserStore } from '../../zustand/User';
import { styles } from './Home.styles';

const Home = () => {
    moment.locale('pt-br'); // Define a localização como português do Brasil

    const [modalVisible, setModalVisible] = useState(false);
    const [shifts, setShifts] = useState([]);

    const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));

    const { user } = UserStore();

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    function changeDate() {
        setCurrentDate('2023-12-11');
    }

    useEffect(() => {
        const listShifts = async () => {
            const shifts = await shiftService.setShiftList(currentDate);
            console.log(shifts);

            setShifts(shifts);
        }
        listShifts();
    }, [currentDate]);

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
