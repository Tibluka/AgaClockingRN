import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        minWidth: '100%'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    textBody: {
        fontSize: 14,
    },
    form: {
        minWidth: '100%' // Aplica o estilo de largura de 100%
    }
});
