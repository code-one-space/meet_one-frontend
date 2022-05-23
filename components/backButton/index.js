import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import style from './backbutton.style';

export default function BackButton ({ onPress ,title }) {
    return (
        <View style = {style.container}>
        <TouchableOpacity style={style.button} onPress={onPress}>
            <Image source={require("../../assets/Ebene_2_white.png")} style = {style.foto}/>
            <Text style = {style.text }>{title}</Text>
        </TouchableOpacity>
        </View>
    );
}
