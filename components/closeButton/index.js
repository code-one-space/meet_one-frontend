import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import style from './close.style';

export default function CloseButton ({ onPress }) {
    return (
        <View style = {style.container}>
            <TouchableOpacity style={style.button} onPress={onPress}>
                <Image source={require("../../assets/close.png")} style = {style.foto}/>
            </TouchableOpacity>
        </View>
    );
}
