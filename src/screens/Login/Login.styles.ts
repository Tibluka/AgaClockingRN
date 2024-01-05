import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f1f7fe',
        width: '100%',
        paddingBottom: 100
    },
    form: {
        width: '100%',
        padding: 16
    },
    formField: {
        backgroundColor: 'white',
        marginBottom: 16,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 6
    },
    label: {
        fontSize: 16,
        marginBottom: 8
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 0,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 10,
        borderBottomWidth: 1
    },
    button: {
        backgroundColor: '#828ac2',
        borderRadius: 12,
        padding: 12,
        paddingHorizontal: 40,
        borderWidth: 0
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    invalidField: {
        color: 'red',
        position: 'absolute',
        bottom: 4,
        fontSize: 12,
        left: 20
    },
    menuPngIcon: {
        
    }
})