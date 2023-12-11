import React from 'react';
import { View, Image } from 'react-native';

import { styles } from './Login.styles';

// import { Container } from './styles';

const Login = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.menuPngIcon}
                source={require('../../assets/img/logo.png')}
            />
        </View>
    )
}

export default Login;