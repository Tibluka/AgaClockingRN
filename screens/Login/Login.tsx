import React, { useEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { UserStore } from '../../zustand/User';
import { styles } from './Login.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { Container } from './styles';

const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const { user, setUser } = UserStore();

    const validateEmail = async () => {
        console.log(email);
        if (email === null) {
            setEmailError('Email é obrigatório');
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Email inválido');
        } else {
            setEmailError(null);
        }
    };

    const validatePassword = async () => {
        console.log(password);
        if (password === null) {
            setPasswordError('Senha é obrigatória');
        } else if (password.length < 6) {
            setPasswordError('Senha deve ter pelo menos 6 caracteres');
        } else {
            setPasswordError(null);
        }
    };

    const handleLogin = async () => {

        await validateEmail();
        await validatePassword();

        if ((emailError !== null || passwordError !== null)) {
            // Lógica de envio do formulário

            return;
        } else {
            try {
                const response = await fetch('https://agaclocking.onrender.com/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                if (data.token) {
                    setUser(data.user);
                    await AsyncStorage.setItem('agc_user', JSON.stringify(data.user));
                    setIsLoggedIn(true);
                    await AsyncStorage.setItem('agc_token', data.token);
                } else {
                    console.error('Token não encontrado na resposta do servidor.');
                }

                // Você pode adicionar mais lógica aqui com base na resposta do servidor
                console.log('Resposta do servidor:', data);
            } catch (error) {
                console.error('Erro ao chamar o serviço:', error);
            }
        }

    };

    return (
        <View style={styles.container}>
            <Image style={styles.menuPngIcon}
                source={require('../../assets/img/logo.png')}
            />
            <View style={styles.form}>
                <View style={styles.formField}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        keyboardType="email-address"
                        style={styles.input}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder="Digite seu email"
                    />
                    {
                        emailError ? (<Text style={styles.invalidField}>{emailError}</Text>) : null
                    }
                </View>

                <View style={styles.formField}>
                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        keyboardType={'numeric'}
                        style={styles.input}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder="Digite sua senha"
                        secureTextEntry
                    />
                    {
                        passwordError ? (<Text style={styles.invalidField}>{passwordError}</Text>) : null
                    }
                </View>

            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login;