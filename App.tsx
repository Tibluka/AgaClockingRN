import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from './src/components/Loading/Loading';
import AppNavigator from './src/components/Navigator/Navigator';
import Splash from './src/screens/Splash/Splash';
import { LoadingStore } from './src/zustand/Loading';
import { UserStore } from './src/zustand/User';

/* if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured")).catch((e) => console.log('AQUI ERRO', e));
} */

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { user, setUser } = UserStore();
  const { loading, setLoading } = LoadingStore();
  const [renderApp, setRenderApp] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const user: any = await AsyncStorage.getItem('agc_user');
      if (user) {
        setUser(user);
      }
    }
    getUser();

  }, [])

  if (renderApp === false) {
    return <Splash setRenderApp={setRenderApp} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading && loading.state === true ? <Loading /> : null}
      <NavigationContainer>
        {/* Passe o estado de login para o AppNavigator */}
        <AppNavigator setIsLoggedIn={setIsLoggedIn} user={user} />
        {/* Aqui você pode adicionar outros componentes, como o botão de alternar login */}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
