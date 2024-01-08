import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Calendar from '../../screens/Calendar/Calendar';
import Charts from '../../screens/Charts/Charts';
import Home from '../../screens/Home/Home';
import Login from '../../screens/Login/Login';
import BottomNavigation from '../BottomNavigation/BottomNavigation';

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

function LoggedInNavigator({ user }) {
    return (
        <LoggedInStack.Navigator>
            <LoggedInStack.Screen name="HOME" options={{ headerShown: true }} component={Home} />
            <LoggedInStack.Screen name="CHARTS" options={{ headerShown: true }} component={Charts} />
            <LoggedInStack.Screen name="CALENDAR" options={{ headerShown: true }} component={Calendar} />

        </LoggedInStack.Navigator>
    );
}

// Componente principal que decide qual Navigator usar com base no estado de login
function AppNavigator({ setIsLoggedIn, user }) {
    return (
        user ?
            (<>
                <LoggedInNavigator user={user} />
                <BottomNavigation />
            </>) :
            (
                <NonLoggedInNavigator setIsLoggedIn={setIsLoggedIn} />
            )
    );
}

export default AppNavigator;