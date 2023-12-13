import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { projectService } from '../../services/ProjectService';
import { UserStore } from '../../zustand/User';
import { styles } from './NewShift.styles';

/* 

{
"startShift":"2023-12-13T16:00:22",
"activity":"desenvolvimento ",
"project":"Agacode",
"endShift":"",
"finished":false,
"userId":"636e43b1ed95fc80872a7b3a"
}
*/

class Form {
    startShift: Date = null;
    endShift: Date = null;
    project: string = "";
    finished: boolean = false;
    userId: string = "";

    constructor(userId: string) {
        this.userId = userId;
    }
}

// import { Container } from './styles';

const NewShift = () => {
    const currentDate = moment().format('DD/MM/YYYY');
    const [projectList, setProjectList] = useState([]);
    const [form, setForm] = useState(null);

    const handlePickerChange = (value) => {
        console.log(value);

        setForm((prevForm) => ({ ...prevForm, project: value }));
        console.log(form);

    };

    useEffect(() => {
        const setNewForm = async () => {
            const user = await JSON.parse(await AsyncStorage.getItem('agc_user'));
            setForm(new Form(user.id));
        }
        const listProjects = async () => {
            const projects = await projectService.setProjectList();
            setProjectList(projects);
        }
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
                {form ? (
                    <Picker
                        selectedValue={form.project}
                        onValueChange={(itemValue) => handlePickerChange(itemValue)}
                    >
                        <Picker.Item label="Escolha um projeto" value="null" />

                        {projectList.map((project, index) => (
                            <Picker.Item key={index} label={project.projectName} value={project._id.$oid} />
                        ))}
                    </Picker>
                ) : null}
            </View>
        </View>
    )
}

export default NewShift;