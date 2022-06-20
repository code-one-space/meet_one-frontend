import { View, Text, TouchableOpacity } from "react-native";
import { Edit, Trash2 } from "react-native-feather";
import style from "./editChoiceListItem.style";

export default function EditChoiceListItem({ choice }) {
    return (
        <View style={style.container}>
            <TouchableOpacity style={style.editButton}>
                <Text style={style.text}>{choice}</Text>
                <Edit stroke="white" fill="#000000" width={25} height={25} style={style.editIcon}/>
            </TouchableOpacity>
            <View style={style.trashContainer}>
                <Trash2 stroke="white" fill="#000000" width={25} height={25} style={style.trashIcon}/>
            </View>
        </View>
    )
}
