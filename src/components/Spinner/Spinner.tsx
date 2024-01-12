import React from 'react';
import { Image } from 'react-native';

const Spinner = () => {
    return (
        <Image style={{ width: 80, height: 80, marginVertical: 24 }}
            source={require('../../assets/animations/spinner.gif')}
        />
    )
}

export default Spinner