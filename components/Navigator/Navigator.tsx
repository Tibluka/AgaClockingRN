import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Charts from '../../screens/Charts/Charts';
import Home from '../../screens/Home/Home';
import Calendar from '../../screens/Calendar/Calendar';
import { styles } from './Navigator.styles';
import BottomNavigation from '../BottomNavigation/BottomNavigation';

// import { Container } from './styles';

const Navigator = () => {
    const [activeTab, setActiveTab] = useState('home');

    const handleTabSelect = (tab) => {
        setActiveTab(tab);
        // Aqui você pode adicionar lógica para mudar o conteúdo da tela com base na aba selecionada
    };
    // Renderizar o componente com base na activeTab
    const renderScreen = () => {
        switch (activeTab) {
            case 'home':
                return <Charts />;
            case 'add':
                return <Home />;
            case 'monthly':
                return <Calendar />;
            default:
                return null; // Ou renderizar algo padrão caso a activeTab seja desconhecida
        }
    };

    return <View style={styles.container}>
        {renderScreen()}

        <BottomNavigation activeTab={activeTab} onSelectTab={handleTabSelect} />
    </View>;
}

export default Navigator;