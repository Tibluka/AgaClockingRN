import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { styles } from './BottomNavigation.styles';


const BottomNavigation = () => {
    const navigation = useNavigation<any>();
    const [activeTab, setActiveTab] = useState(navigation.getCurrentRoute().name);

    function onSelectTab(menuOption: string) {
        navigation.navigate(menuOption);
        setActiveTab(navigation.getCurrentRoute().name);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.tab, activeTab == 'CHARTS' && styles.activeTab]}
                onPress={() => onSelectTab('CHARTS')}
            >
                <Image style={styles.img}
                    source={require('../../assets/icon/graphics-icon.png')}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.tab, activeTab == 'HOME' && styles.activeTab]}
                onPress={() => onSelectTab('HOME')}
            >
                <Image style={styles.img}
                    source={require('../../assets/icon/home.png')}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.tab, activeTab == 'CALENDAR' && styles.activeTab]}
                onPress={() => onSelectTab('CALENDAR')}
            >
                <Image style={styles.img}
                    source={require('../../assets/icon/calendar-icon.png')}
                />
            </TouchableOpacity>
        </View>
    );
};

export default BottomNavigation;
