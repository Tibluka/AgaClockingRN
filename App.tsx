import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import AppNavigator from './src/components/Navigator/Navigator';

if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured")).catch((e) => console.log('AQUI ERRO', e));
}
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem('agc_user');
      if (user) {
        setUser(user);
      }
    }
    getUser()

  }, [])

  return (
    <NavigationContainer>
      {/* Passe o estado de login para o AppNavigator */}
      <AppNavigator setIsLoggedIn={setIsLoggedIn} user={user} />
      {/* Aqui você pode adicionar outros componentes, como o botão de alternar login */}
    </NavigationContainer>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  }
});

export default App;
