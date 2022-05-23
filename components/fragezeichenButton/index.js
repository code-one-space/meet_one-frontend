import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import style from './fragezeichen.style';

export default function FrageButton ({ onPress }) {
    return (
        <View style = {style.container} >
            <TouchableOpacity style={style.button} onPress={onPress}>
                <Image source={require("../../assets/rrrr.png")} style = {style.foto}/>
            </TouchableOpacity>
        </View>
    );
}
