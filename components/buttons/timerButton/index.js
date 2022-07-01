import {View, Text,TouchableOpacity} from 'react-native';
import style from './timerButton.style';
import * as Icon from "react-native-feather";
import React from "react";


export default function TimerButton ({ onPress, time }) {


    return (
        <View style={style.container}>
            <Text style={style.text}>{time}</Text>
            <TouchableOpacity onPress={onPress} style={style.iconContainer}>
                <Icon.Clock stroke="white" fill="black" strokeWidth={1.5} width={25} height={25}/>
            </TouchableOpacity>
        </View>

    );
}
