import style from "./teamListItem.style";
import {Text, TouchableOpacity, View, Image} from "react-native";
import {User, Send} from "react-native-feather";

export default function TeamListItem({ title, color, onPressPerson, onPressNotification, showNotificationButton }) {
    let imageSource;

    switch (color) {
        case "black":
            imageSource = require("@@assets/hats/black.png");
            break;
        case "white":
            color = "grey";
            imageSource = require("@@assets/hats/white.png");
            break;
        case "green":
            imageSource = require("@@assets/hats/green.png");
            break;
        case "blue":
            imageSource = require("@@assets/hats/blue.png");
            break;
        case "red":
            imageSource = require("@@assets/hats/red.png");
            break;
        case "yellow":
            color = "#ebcd23"
            imageSource = require("@@assets/hats/yellow.png");
            break;
    }

    let userIcon;
    if (color)
        userIcon = <Image source={imageSource} style={style.image}/>
    else
        userIcon = <User style={style.userIcon} stroke={"black"} fill={"white"} width={25} height={25}/>

    let notificationButton = showNotificationButton &&
        <TouchableOpacity style={style.notificationContainer} onPress={onPressNotification}>
            <Send stroke={"white"} fill={"black"} strokeWidth={1.5} width={25} height={25}/>
        </TouchableOpacity>

    return (
        <View style={style.container}>
            <TouchableOpacity style={[style.personContainer, { borderColor: color ? color : "black"}]} onPress={onPressPerson}>
                <Text style={style.text}>{title}</Text>
                {userIcon}
            </TouchableOpacity>

            {notificationButton}
        </View>
    )
}
