import buttonStyle from './button.style';
import { TouchableOpacity, Text } from "react-native";

export default function Button ({ onPress, title, white }) {
    let buttonBackground = white ? "white" : "black";
    let buttonText = white ? "black" : "white";

    return (
        <TouchableOpacity style={[buttonStyle.button, {backgroundColor: buttonBackground}]} onPress={onPress}>
            <Text style={[buttonStyle.text, {color: buttonText}]}>{title}</Text>
        </TouchableOpacity>
    );
}
