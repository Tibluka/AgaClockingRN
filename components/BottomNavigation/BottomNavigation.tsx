import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { styles } from './BottomNavigation.styles';


const BottomNavigation = ({ activeTab, onSelectTab }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'home' && styles.activeTab]}
                onPress={() => onSelectTab('home')}
            >
                <Image style={styles.img}
                    source={require('../../assets/icon/graphics-icon.png')}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.tab, activeTab === 'add' && styles.activeTab]}
                onPress={() => onSelectTab('add')}
            >
                <Image style={styles.img}
                    source={require('../../assets/icon/home.png')}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.tab, activeTab === 'monthly' && styles.activeTab]}
                onPress={() => onSelectTab('monthly')}
            >
                <Image style={styles.img}
                    source={require('../../assets/icon/calendar-icon.png')}
                />
            </TouchableOpacity>
        </View>
    );
};

export default BottomNavigation;
