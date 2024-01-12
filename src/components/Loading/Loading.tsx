import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './Loading.styles'

const Loading = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Loading</Text>
        </SafeAreaView>
    )
}

export default Loading