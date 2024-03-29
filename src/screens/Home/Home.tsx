import { NavigationContainerRefContext, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/pt-br'; // Importa a localização para português do Brasil
import React, { useEffect, useState } from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import NewShift from '../../components/NewShift/NewShift';
import Spinner from '../../components/Spinner/Spinner';
import { useShift } from '../../hooks/Shift.hook';
import { LoadingStore } from '../../zustand/Loading';
import { ShiftStore } from '../../zustand/Shift';
import { styles } from './Home.styles';
import io from 'socket.io-client';


const Home = () => {
    const socket = io('http://192.168.15.69:6001');
    moment.locale('pt-br'); // Define a localização como português do Brasil
    const [modalVisible, setModalVisible] = useState(false);
    const { shifts } = ShiftStore();

    const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));
    const [selectedShift, setSelectedShift] = useState(null);

    const { setShiftList } = useShift();
    const { loading } = LoadingStore();

    const openModal = (shift) => {
        setSelectedShift(shift);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    function changeDate(type) {
        let newDate = null;
        if (type === 'previous') {
            newDate = moment(currentDate).subtract(1, 'd');
        } else if (type === 'next') {
            newDate = moment(currentDate).add(1, 'd');
        }
        setCurrentDate(moment(newDate).format('YYYY-MM-DD'));
    }

    function onSend() {
        socket.emit('message', 'mensagem cliente')
    }

    const calculateDifference = (startShiftDate, endShiftDate) => {
        const startShift = moment(startShiftDate);
        const endShift = moment(endShiftDate);

        const minutesDifference = endShift.diff(startShift, 'minutes');
        const hours = Math.floor(minutesDifference / 60);
        const minutes = minutesDifference % 60;

        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}h`;
    };

    useEffect(() => {
        const listShifts = async () => {
            await setShiftList(currentDate);
        }
        listShifts();

        // Evento para manipular a conexão bem-sucedida
        socket.on('connect', () => {
            console.log('Conectado ao servidor WebSocket');
        });

        // Evento para manipular a desconexão
        socket.on('disconnect', () => {
            console.log('Desconectado do servidor WebSocket');
        });

        // Evento personalizado para receber mensagens do servidor
        socket.on('server_response', (data) => {
            console.log('Mensagem do servidor:', data);
        });

        socket.on('message', (msg) => {
            console.log('message received fro mserver', msg);
        });

        // ComponentWillUnmount - desconecta o socket quando o componente é desmontado
        return () => {
            socket.disconnect();
        };

    }, [currentDate, modalVisible]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={{ flex: 1, height: 100, justifyContent: 'center', alignItems: 'center' }} onPress={() => { changeDate('previous') }}>
                    <Image style={styles.arrowLeft}
                        source={require('../../assets/icon/arrow-left.png')}
                    />
                </TouchableOpacity>

                <Text style={styles.title}>{moment(currentDate).format('ddd DD/MM/YYYY')}</Text>

                <TouchableOpacity style={{ flex: 1, height: 100, justifyContent: 'center', alignItems: 'center' }} onPress={() => { changeDate('next') }}>
                    <Image style={styles.arrowRight}
                        source={require('../../assets/icon/arrow-left.png')}
                    />
                </TouchableOpacity>
            </View>

            {
                loading.state === true && !loading.blockBackground ?
                    <Spinner /> :
                    (
                        shifts && shifts.length > 0 ? shifts.map((shift) => (
                            <TouchableOpacity style={styles.shift} key={shift._id.$oid} onPress={() => openModal(shift)}>

                                <View style={styles.projectName}>
                                    {
                                        !shift.finished ?
                                            (
                                                <Image style={styles.shift.img}
                                                    source={require('../../assets/icon/power-off.png')}
                                                />
                                            )
                                            :
                                            (
                                                <Image style={styles.shift.img}
                                                    source={require('../../assets/icon/check.png')}
                                                />
                                            )
                                    }
                                    <Text numberOfLines={1} ellipsizeMode='tail'>{shift.project}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>{moment(shift.startShift).format('HH:mm')}h</Text>
                                    {shift.finished ?
                                        <Text> às {moment(shift.endShift).format('HH:mm')}h</Text>
                                        : null}
                                </View>

                                <View>
                                    {
                                        shift.finished ?
                                            (<Text>{calculateDifference(shift.startShift, shift.endShift)}</Text>)
                                            :
                                            (<Text>Em aberto</Text>)
                                    }
                                </View>

                            </TouchableOpacity>
                        )) :
                            <View style={{ marginVertical: 24 }}>
                                <Text>Nenhum turno registrado</Text>
                            </View>
                    )
            }

            <TouchableOpacity style={styles.button} onPress={onSend}>
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
                        <NewShift shift={selectedShift} setModalVisible={setModalVisible} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Home;
