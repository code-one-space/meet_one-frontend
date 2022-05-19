import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import buttonStyle from './backbutton.style';

export default function BackButton ({ onPress, white = true }) {
    const imageSource = white ? "@@assets/BackButtonWhite.png" : "@@assets/BackButtonBlack.png"
    return (
        <View>
        <TouchableOpacity style={buttonStyle.button} onPress={onPress}>
            <Image source={require(imageSource)} style = {buttonStyle.foto}/>
        </TouchableOpacity>
        </View>
    );
}
