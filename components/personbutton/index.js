import {View, TouchableOpacity, Image, Text} from 'react-native';
import style from './personbutton.style';
import * as navigation from "Navigation";

export default function PersonButton ({ onPress, title  }) {
    const imageSource = require("@@assets/BackButtonWhite.png")
    return (
        <TouchableOpacity onPress={() => onPress}>
            <View style={style.container}>
                <Text style={style.text}>{title}</Text>
                <Image source={imageSource} style={style.image}/>
            </View>
        </TouchableOpacity>
    );
}
