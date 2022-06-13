import {View, Image, Text, ViewComponent, SafeAreaView} from 'react-native';
import style from './personButton.style';

export default function PersonButton ({  title, color }) {
    let imageSource = require("@@assets/person.png");
    let textColor ="white";

    switch (color) {
        case undefined:
            imageSource = require("@@assets/person.png");
            color = "black";
            textColor = "white";
            break;
        case "black":
            imageSource = require("@@assets/hats_black.png");
            textColor = "white";
            break;
        case "white":
            imageSource = require("@@assets/hats_white.png");
            textColor = "black";
            break;
        case "green ":
            imageSource = require("@@assets/hats_green.png");
            textColor = "black";
            break;
        case "blue":
            imageSource = require("@@assets/hats_blue.png");
            textColor = "black";
            break;
        case "red":
            imageSource = require("@@assets/hats_red.png");
            textColor = "black";
            break;
        case "yellow":
            color = "#F6FE8296"
            imageSource = require("@@assets/hats_yellow.png");
            textColor = "black";
            break;
    }

    return (
        <SafeAreaView>
        <View style={style.container} backgroundColor={"white"} borderColor ={color} >
                <View style={style.text}>
                <Text color={textColor} >{title} </Text>
                </View>
               <View style={style.image_container} >
                   <Image source={imageSource} style={style.image}  />
               </View>
            </View>
        </SafeAreaView>
    );
}
