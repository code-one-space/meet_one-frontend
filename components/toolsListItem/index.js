import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import style from './toolsListItem.style';

export default function ToolsListItem ({ title, onPress, timestamp, done }) {
    timestamp = new Date(timestamp);
    let time = timestamp.toLocaleTimeString();
    let date = timestamp.toLocaleDateString();

    title = "Devils Advocat" // TODO remove as soon as other tools are implemented
    if (done)
        title += " ended"

    const imageSource =  require("@@assets/hat.jpg");

    return (
        <View style = {style.container}>
            <TouchableOpacity style={style.button} onPress={onPress}>

                <View style = {style.inner_container} >
                    <Text style = {style.title}>{title}</Text>
                     <Image source={imageSource} style = {style.image}/>
                </View>

                <View style = {style.inner_container}>
                    <Text style={style.time}>{time}</Text>
                    <Text style={style.date}>{date}</Text>
                </View>

            </TouchableOpacity>
        </View>
    );
}
