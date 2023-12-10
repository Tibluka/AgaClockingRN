import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { styles } from './BottomNavigation.styles';


const BottomNavigation = ({ activeTab, onSelectTab }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'home' && styles.activeTab]}
                onPress={() => onSelectTab('home')}
            >
                <SvgUri style={styles.menuSvgIcon}
                    source={require('../../assets/icon/graphics-icon.svg')}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.tab, activeTab === 'add' && styles.activeTab]}
                onPress={() => onSelectTab('add')}
            >
                <SvgUri style={styles.menuSvgIcon}
                    source={require('../../assets/icon/home.svg')}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.tab, activeTab === 'monthly' && styles.activeTab]}
                onPress={() => onSelectTab('monthly')}
            >
                <SvgUri style={styles.menuSvgIcon}
                    source={require('../../assets/icon/calendar-icon.svg')}
                />
            </TouchableOpacity>
        </View>
    );
};

export default BottomNavigation;
