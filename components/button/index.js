import buttonStyle from './button.style';
import { TouchableOpacity, Text } from "react-native";

export default function Button ({ onPress, title }) {
    return (
        <TouchableOpacity style={buttonStyle.button} onPress={onPress}>
            <Text style={buttonStyle.text}>{title}</Text>
        </TouchableOpacity>
    );
}
