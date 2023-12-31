import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#606585',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#828ac2', // Cor de fundo quando a aba está ativa
        height: '100%'
    },
    img: {
        width: 24,
        height: 24
    }
});