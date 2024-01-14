import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { HML } from '../../../config';
import { LoadingStore } from '../../zustand/Loading';
import { UserStore } from '../../zustand/User';
import { styles } from './Login.styles';

// import { Container } from './styles';

const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const { setLoading } = LoadingStore();

    const { setUser } = UserStore();

    const validateEmail = () => {
        if (email === null) {
            setEmailError('Email é obrigatório');
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Email inválido');
        } else {
            setEmailError(null);
        }
    };

    const validatePassword = () => {
        if (password === null) {
            setPasswordError('Senha é obrigatória');
        } else if (password.length < 6) {
            setPasswordError('Senha deve ter pelo menos 6 caracteres');
        } else {
            setPasswordError(null);
        }
    };

    const handleLogin = async () => {
        validateEmail();
        validatePassword();
        console.log('aqui');

        if ((emailError !== null || passwordError !== null)) {
            // Lógica de envio do formulário
            return;
        } else {
            try {
                setLoading({ state: true, blockBackground: false });
                const response = await fetch(`${HML.API_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
                setLoading({ state: false, blockBackground: true });
                const data = await response.json();
                if (data.token) {
                    console.log(data.user);
                    await AsyncStorage.setItem('agc_token', data.token);

                    await AsyncStorage.setItem('agc_user', JSON.stringify(data.user));
                    /* setIsLoggedIn(true); */
                    setUser(data.user);

                } else {
                    console.error('Token não encontrado na resposta do servidor.');
                }

                // Você pode adicionar mais lógica aqui com base na resposta do servidor
                console.log('Resposta do servidor:', data);
            } catch (error) {
                setLoading({ state: false, blockBackground: true });
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