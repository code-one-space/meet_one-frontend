import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import buttonStyle from './backbutton.style';

export default function BackButton ({ onPress ,title }) {
    return (
        <View style = {buttonStyle.container}>
        <TouchableOpacity style={buttonStyle.button} onPress={onPress}>
            <Image source={require("../../assets/Ebene_2_white.png")} style = {buttonStyle.foto}/>
            <Text style = {buttonStyle.text }>{title}</Text>
        </TouchableOpacity>
        </View>
    );
}
