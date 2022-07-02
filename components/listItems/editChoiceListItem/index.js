import { View, Text, TouchableOpacity } from "react-native";
import { Edit, Trash2 } from "react-native-feather";
import style from "./editChoiceListItem.style";

export default function EditChoiceListItem({ choice, onPressEdit, onPressDelete }) {
    return (
        <View style={style.container}>
            <TouchableOpacity style={style.editButton} onPress={onPressEdit} disabled={true}>
                <Text style={style.text}>{choice}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.trashContainer} onPress={onPressDelete}>
                <Trash2 stroke="white" fill="#000000" width={25} height={25}/>
            </TouchableOpacity>
        </View>
    )
}
