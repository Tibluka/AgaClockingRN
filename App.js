import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomNavigation from './components/BottomNavigation/BottomNavigation'
import Calendar from './screens/Calendar/Calendar';
import Charts from './screens/Charts/Charts';
import Home from './screens/Home/Home';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
    // Aqui você pode adicionar lógica para mudar o conteúdo da tela com base na aba selecionada
  };

  // Renderizar o componente com base na activeTab
  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'add':
        return <Charts />;
      case 'monthly':
        return <Calendar />;
      default:
        return null; // Ou renderizar algo padrão caso a activeTab seja desconhecida
    }
  };

  return (
    <View style={styles.container}>
      {/* meu componente de acordo com a activeTab */}

      {renderScreen()}

      {/* Barra de navegação inferior */}
      <BottomNavigation activeTab={activeTab} onSelectTab={handleTabSelect} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
