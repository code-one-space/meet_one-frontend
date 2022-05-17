import React from 'react';
import {Text, TextInput, SafeAreaView, TouchableOpacity, View, Image} from 'react-native';
import style from './toolslistetem.style';

export default function ToolsListEtem ({date, time, title, onPress}) {

    return (
        <View style = {style.container}>
            <TouchableOpacity style={style.button} onPress={onPress}>
            <View style = {style.container_klein} >

                <Text style = {style.title}>{title}</Text>
                <Image source={require("../../assets/icon.png")} style = {style.foto}/>

            </View>

             <View style = {style.container_klein}>

            <Text style={style.text}>{time}</Text>
            <Text style={style.text}>{date}</Text>

        </View>
            </TouchableOpacity>

        </View>
    );
}
