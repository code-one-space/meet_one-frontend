import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SelectNotificationButton } from "@@components";
import Button from "../../buttons/button";
import style from "./choiceModal.style";
import Modal from "react-native-modal";

export default function ChoiceModal({ onRequestClose, title, choices, ...rest }) {
    
    return (
        <Modal
            // TODO: Optional flag
            // onBackdropPress={onRequestClose}
            onRequestClose={onRequestClose}
            hasBackdrop={true}
            backdropColor={"black"}
            backdropOpacity={1.0}
            style={{ margin: 0 }}
            {...rest}>
            <TouchableOpacity style={style.container} onPress={onRequestClose}>
                <View style={style.innerContainer}>
                    <Text style={style.title}>{title}</Text>
                    {/* <FlatList
                        style={style.list}
                        data={choices ?? []}
                        renderItem={({item}) => {
                            renderData(item)
                        }}
                        keyExtractor={
                            item => (~~(Math.random()*10000))
                            // item => 1
                        }
                    /> */}
                    <ScrollView contentContainerStyle={style.listItems} style={style.list}>{choices}</ScrollView>
                    <Button title={"Cancel"} white={true} onPress={onRequestClose} buttonStyle={style.button} />
                </View>
            </TouchableOpacity>
        </Modal>
    )
}
