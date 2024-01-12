import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Charts from '../../screens/Charts/Charts';
import Home from '../../screens/Home/Home';
import Calendar from '../../screens/Calendar/Calendar';
import { styles } from './Navigator.styles';
import BottomNavigation from '../BottomNavigation/BottomNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screens/Login/Login';

// StackNavigator para a área não logada
const NonLoggedInStack = createNativeStackNavigator();

function NonLoggedInNavigator({ setIsLoggedIn }) {
    return (
        <NonLoggedInStack.Navigator>
            <NonLoggedInStack.Screen
                name="LOGIN"
                options={{ headerShown: false }}>
                {(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
            </NonLoggedInStack.Screen>

        </NonLoggedInStack.Navigator >
    );
}

// StackNavigator para a área logada
const LoggedInStack = createNativeStackNavigator();

function LoggedInNavigator() {
    return (
        <LoggedInStack.Navigator>
            <LoggedInStack.Screen name="HOME" component={Home} />
            <LoggedInStack.Screen name="CHARTS" component={Charts} />
            <LoggedInStack.Screen name="CALENDAR" component={Calendar} />
        </LoggedInStack.Navigator>
    );
}

// Componente principal que decide qual Navigator usar com base no estado de login
function AppNavigator({ setIsLoggedIn, user }) {
    return (
        user ?
            (<>
                <LoggedInNavigator />
                <BottomNavigation />
            </>) :
            (
                <NonLoggedInNavigator setIsLoggedIn={setIsLoggedIn} />
            )
    );
}

export default AppNavigator;