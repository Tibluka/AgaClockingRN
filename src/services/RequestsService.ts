// requestService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { HML } from '../../config';

const api = axios.create({
    baseURL: HML.API_URL, // substitua pela sua URL de API
});

// Interceptor para adicionar token a todas as requisições
api.interceptors.request.use(
    async (config: any) => {
        const token = await obterToken(); // implemente sua lógica de obtenção de token

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Interceptor para tratar erros comuns
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response) {
            // O servidor respondeu com um status de erro (por exemplo, 4xx ou 5xx)
            console.error('Erro de resposta:', error.response.data);
        } else if (error.request) {
            // A requisição foi feita, mas não houve resposta
            console.error('Erro de requisição:', error.request);
        } else {
            // Algo aconteceu ao configurar a requisição que acionou um erro
            console.error('Erro durante a configuração da requisição:', error.message);
        }

        return Promise.reject(error);
    }
);

const obterToken = async (): Promise<string | null> => {
    try {
        const token = await AsyncStorage.getItem('agc_token');
        return token;
    } catch (error) {
        console.error('Erro ao obter token:', error);
        return null;
    }
};

export default api;
