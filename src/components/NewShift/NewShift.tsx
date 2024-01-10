import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useShift } from '../../hooks/Shift.hook';
import { projectService } from '../../services/ProjectService';
import api from '../../services/RequestsService';
import { ShiftStore } from '../../zustand/Shift';
import { styles } from './NewShift.styles';



class Form {
    startShift: string = null;
    endShift: string = null;
    project: string = "";
    finished: boolean = false;
    userId: string = "";
    activity: string = "";

    constructor(userId: string, startShift: string, endShift: string, project: string, activity: string) {
        this.userId = userId;
        this.startShift = startShift;
        this.endShift = endShift;
        this.project = project;
        this.activity = activity;
        if (this.endShift) this.finished = true;
    }
}

// import { Container } from './styles';

const NewShift = ({ setModalVisible }: any) => {
    const currentDate = moment().format('DD/MM/YYYY');
    const [projectList, setProjectList] = useState([]);

    const [startShiftHour, setStartShiftHour] = useState(null);
    const [startShiftMinute, setStartShiftMinute] = useState(null);
    const [endShiftHour, setEndShiftHour] = useState(null);
    const [endShiftMinute, setEndShiftMinute] = useState(null);

    const [userId, setUserId] = useState("");
    const [project, setProject] = useState("");
    const [activity, setActivity] = useState("");

    const [startShift, setStartShift] = useState(moment(new Date()).format('YYYY-MM-DDTHH:mm:00'));
    const [endShift, setEndShift] = useState(moment(new Date()).format('YYYY-MM-DDTHH:mm:00'));

    const [hourList, setHourList] = useState([]);
    const [minuteList, setMinuteList] = useState([]);

    const { updateShift } = useShift();

    const handlePickerChange = (value: number, key: string) => {

        if (key === 'startShiftHour') {
            const newTime = moment(startShift).hours(value).format('YYYY-MM-DDTHH:mm:00');
            setStartShift(newTime);
            setStartShiftHour(value);
        }
        if (key === 'startShiftMinute') {
            const newTime = moment(startShift).minutes(value).format('YYYY-MM-DDTHH:mm:00');
            setStartShift(newTime);
            setStartShiftMinute(value);
        }
        if (key === 'endShiftHour') {
            const newTime = moment(endShift).hours(value).format('YYYY-MM-DDTHH:mm:00');
            setEndShift(newTime);
            setEndShiftHour(value);
        }
        if (key === 'endShiftMinute') {
            const newTime = moment(endShift).minutes(value).format('YYYY-MM-DDTHH:mm:00');
            setEndShift(newTime);
            setEndShiftMinute(value);
        }



    };

    async function addShift() {
        const payload = new Form(userId, startShift, endShift, project, activity);

        await updateShift(payload);

        setModalVisible(false);
    }

    function closeModal() {
        setModalVisible(false);
    }

    useEffect(() => {
        const setNewForm = async () => {
            const user = await JSON.parse(await AsyncStorage.getItem('agc_user'));
            setUserId(user.id);
        }
        const listProjects = async () => {
            const projects = await projectService.setProjectList();
            setProjectList(projects);
        }

        const listHours = async () => {
            let hours = [];
            for (let index = 0; index <= 23; index++) {
                hours.push(
                    { description: `${index < 10 ? `0${index}` : index}`, value: index }
                )
            }
            setHourList(hours);
        }

        const listMinutes = async () => {
            let minutes = [];
            for (let index = 0; index <= 59; index++) {
                minutes.push(
                    { description: `${index < 10 ? `0${index}` : index}`, value: index }
                )
            }
            setMinuteList(minutes);
        }

        listHours();
        listMinutes();
        listProjects();
        setNewForm();

    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Registrar</Text>
                <Text>{currentDate}</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.formItem}>
                    <Text style={styles.label}>Horario inicial</Text>
                    <Picker style={{ width: '100%' }}
                        selectedValue={project}
                        onValueChange={(itemValue) => setProject(itemValue)}
                    >
                        <Picker.Item label="Escolha um projeto" value="null" />

                        {projectList.map((project, index) => (
                            <Picker.Item key={index} label={project.projectName} value={project.projectName} />
                        ))}
                    </Picker>
                </View>

                <View style={styles.formItem}>
                    <Text style={styles.label}>Horario inicial</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', width: 100 }}>
                        <Picker style={{ width: 150 }}
                            selectedValue={startShiftHour}
                            onValueChange={(itemValue) => handlePickerChange(itemValue, 'startShiftHour')}
                        >
                            <Picker.Item label="Hora inicial" value="null" />
                            {hourList.map((hour, index) => (
                                <Picker.Item key={index} label={hour.description} value={hour.value} />
                            ))}

                        </Picker>
                        <Picker style={{ width: 150 }}
                            selectedValue={startShiftMinute}
                            onValueChange={(itemValue) => handlePickerChange(itemValue, 'startShiftMinute')}
                        >
                            <Picker.Item label="Minuto inicial" value="null" />
                            {minuteList.map((minute, index) => (
                                <Picker.Item key={index} label={minute.description} value={minute.value} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={styles.formItem}>
                    <Text style={styles.label}>Horario final</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', width: 100 }}>
                        <Picker style={{ width: 150 }}
                            selectedValue={endShiftHour}
                            onValueChange={(itemValue) => handlePickerChange(itemValue, 'endShiftHour')}
                        >
                            <Picker.Item label="Hora final" value="null" />
                            {hourList.map((hour, index) => (
                                <Picker.Item key={index} label={hour.description} value={hour.value} />
                            ))}

                        </Picker>
                        <Picker style={{ width: 150 }}
                            selectedValue={endShiftMinute}
                            onValueChange={(itemValue) => handlePickerChange(itemValue, 'endShiftMinute')}
                        >
                            <Picker.Item label="Minuto final" value="null" />
                            {minuteList.map((minute, index) => (
                                <Picker.Item key={index} label={minute.description} value={minute.value} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={[styles.formItem, styles.textarea]}>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(text) => setActivity(text)}
                        value={activity} />
                </View>

                <TouchableOpacity style={[styles.button, { marginBottom: 12 }]} onPress={addShift}>
                    <Text>Adicionar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={closeModal}>
                    <Text style={{ color: '#fff' }}>Cancelar</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default NewShift;