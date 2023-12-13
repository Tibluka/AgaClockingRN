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
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 16,
        fontWeight: 'normal'
    },
    textBody: {
        fontSize: 14
    },
    form: {
        width: 200
    },
    picker: {
        color: 'green'
    }
});