import React from 'react'
import { Image, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './Loading.styles'

const Loading = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Image style={{ width: 80, height: 80 }}
                source={require('../../assets/animations/loading.gif')}
            />
        </SafeAreaView>
    )
}

export default Loading