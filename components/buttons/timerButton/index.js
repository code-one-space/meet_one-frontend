import {View, Text,TouchableOpacity} from 'react-native';
import style from './timerButton.style';
import * as Icon from "react-native-feather";
import React from "react";


export default function TimerButton ({ onPress, time }) {


    return (
        <TouchableOpacity onPress={onPress}>

            <View style={style.container}>
                    <Icon.Clock stroke="black" fill="white" width={30} height={30} style = {style.icon}/>
                    <Text style={style.text}>{time}</Text>
            </View>

        </TouchableOpacity>

    );
}
