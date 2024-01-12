import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Splash = ({ setRenderApp }) => {

    function playBackStatus(status: AVPlaybackStatus) {
        setRenderApp(status['didJustFinish']);
    }

    return (
        <Video
            style={StyleSheet.absoluteFill}
            resizeMode={ResizeMode.COVER}
            source={require('../../assets/video/splash.mp4')}
            isLooping={false}
            onPlaybackStatusUpdate={playBackStatus}
            shouldPlay={true}
        />
    )
}

export default Splash;