import { Text, TouchableOpacity } from "react-native";
import { Plus } from "react-native-feather";
import style from "./addFAB.style";

export default function AddFAB({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={style.container}>
            <Plus width={30} height={30} fill={"white"} stroke={"white"}/>
        </TouchableOpacity>
    )
}
