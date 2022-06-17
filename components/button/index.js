import buttonStyle from './button.style';
import { TouchableOpacity, Text } from "react-native";
import {useState} from "react";

export default function Button ({ onPress, title, white, spamProtection }) {
    let buttonBackground = white ? "white" : "black";
    let buttonText = white ? "black" : "white";

    const [disabled, setDisabled] = useState(false);

    return (
        <TouchableOpacity disabled={disabled} style={[buttonStyle.button, {backgroundColor: buttonBackground}]} onPress={() => {
            if (spamProtection) {
                setDisabled(true);
                new Promise(resolve => { setTimeout(resolve, 300) }).then(() => setDisabled(false));
            }
            onPress();
        }}>
            <Text style={[buttonStyle.text, {color: buttonText}]}>{title}</Text>
        </TouchableOpacity>
    );
}
