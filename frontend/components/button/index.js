import buttonStyle from './buttonStyle';
import {Pressable} from "react-native";
import {Text} from "react-native-web";

export default function Button (props) {
    const {onPress, title} = props;
    return (
        <Pressable style={buttonStyle.button} onPress={onPress}>
            <Text style={buttonStyle.text}>{title}</Text>
        </Pressable>
    );
}
