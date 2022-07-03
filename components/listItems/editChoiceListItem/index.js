import { View, Text, TouchableOpacity } from "react-native";
import { Edit, Trash2 } from "react-native-feather";
import style from "./editChoiceListItem.style";

export default function EditChoiceListItem({ choice, onPressEdit, onPressDelete }) {
    return (
        <View style={style.container}>
            <TouchableOpacity style={style.editButton} onPress={onPressEdit}>
                <Text style={style.text}>{choice}</Text>
                <Edit style={style.editIcon} stroke="black" fill="white" width={25} height={25}/>
            </TouchableOpacity>
            <TouchableOpacity style={style.trashContainer} onPress={onPressDelete}>
                <Trash2 stroke="white" fill="#000000" width={25} height={25}/>
            </TouchableOpacity>
        </View>
    )
}
