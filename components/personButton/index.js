import {View, TouchableOpacity, Image, Text} from 'react-native';
import style from './personButton.style';

export default function PersonButton ({ onPress, title, color }) {
    let imageSource = require("@@assets/person.png");
    let textColor ="white";

    switch (color) {
        case undefined:
            imageSource = require("@@assets/person.png");
            color = "black";
            textColor = "white";
            break;
        case "black":
            imageSource = require("@@assets/person.png");
            textColor = "white";
            break;
        case "white":
            imageSource = require("@@assets/person.png");
            textColor = "black";
            break;
        case "green ":
            imageSource = require("@@assets/person.png");
            textColor = "black";
            break;
        case "blue":
            imageSource = require("@@assets/person.png");
            textColor = "black";
            break;
        case "red":
            imageSource = require("@@assets/person.png");
            textColor = "black";
            break;
        case "yellow":
            imageSource = require("@@assets/person.png");
            textColor = "black";
            break;
    }

    return (
        <TouchableOpacity onPress={() => onPress}>
            <View style={style.container} backgroundColor={color} >
                <Text style={{
                    color:textColor,
                    paddingRight: "50%",
                    fontSize: 16,
                    lineHeight: 21,
                    fontWeight: "300",
                    letterSpacing: 0.25,}}>{title}</Text>
                <Image source={imageSource} style={style.image}  />
            </View>
        </TouchableOpacity>
    );
}
