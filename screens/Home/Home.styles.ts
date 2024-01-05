import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title: {
        fontSize: 20,
    },
    button: {
        position: 'absolute',
        bottom: 70,
        right: 20
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%'
    },
    shift: {
        height: 60,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
        img: {
            width: 24,
            height: 24,
            marginRight: 16
        }
    },
    projectName: {
        display: 'flex',
        flexDirection: 'row'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        arrowRight: {
            width: 16,
            height: 16,
            transform: [{ rotate: '180deg' }],
            marginLeft: 48
        },
        arrowLeft: {
            width: 16,
            height: 16,
            marginRight: 48
        }
    }
});