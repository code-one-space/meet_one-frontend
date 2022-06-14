import {Image, Text, TouchableOpacity} from "react-native";
import buttonStyle from "./selectNotificationButton.style";


export default function SelectNotificationButton({ title, onPress, white }) {
    let buttonBackground = white ? "white" : "black";
    let buttonText = white ? "black" : "white";

    return (
        <TouchableOpacity style={[buttonStyle.button, {backgroundColor: buttonBackground}]} onPress={onPress}>
            <Text style={[buttonStyle.text, {color: buttonText}]}>{title}</Text>
            <Image source={require("@@assets/backButtonBlack.png")} style={buttonStyle.arrow}/>
        </TouchableOpacity>
    );
}
