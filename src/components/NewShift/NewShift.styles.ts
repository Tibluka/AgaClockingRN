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
        marginTop: 32,
        minWidth: '100%' // Aplica o estilo de largura de 100%
    },
    formItem: {

    },
    textarea: {
        borderWidth: 0.2,
        borderRadius: 8,
        marginVertical: 32,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    label: {

    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: '#c3c3c3',
        borderRadius: 8,
        paddingVertical: 8
    }
});
