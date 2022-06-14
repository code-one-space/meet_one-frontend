import { View, Text, TouchableOpacity } from "react-native";
import style from "./addToolButton.style";

export default function AddToolButton({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={style.container}>
            <Text style={style.text}>+</Text>
        </TouchableOpacity>
    )
}
