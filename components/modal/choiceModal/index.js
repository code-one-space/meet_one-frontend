import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Button from "../../buttons/button";
import style from "./choiceModal.style";
import Modal from "react-native-modal";

export default function ChoiceModal({ onRequestClose, title, choices, ...rest }) {
    
    function renderData(item) {
        return <Button title={item} white={true} spamProtection={true} />
    }

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
                    <FlatList
                        data={choices ?? []}
                        renderItem={(item) => {
                            renderData(item)
                        }}
                        keyExtractor={
                            item => choices?.indexOf(item)
                        }
                    />
                    <Button title={"Cancel"} white={true} onPress={onRequestClose} buttonStyle={style.button} />
                </View>
            </TouchableOpacity>
        </Modal>
    )
}
