import {View, Text,TouchableOpacity} from 'react-native';
import style from './timerButton.style';
import * as Icon from "react-native-feather";
import React from "react";


export default function TimerButton ({ onPress,time}) {


    return (
        <TouchableOpacity onPress={onPress}>

            <View style={style.container}>

                <View style={style.innerContainer}>
                    <Icon.Clock stroke="white" fill="#000000" width={25} height={25} style = {style.icon}/>
                    <Text style={style.text}>{time}</Text>
                </View>

            </View>

        </TouchableOpacity>

    );
}
