import { View, Text, TextInput } from "react-native";
import { useState } from "react";
import ChoiceButton from "../../buttons/choiceButton";
import style from "./CreatePollChoiceModal.style";
import Modal from "react-native-modal";

export default function CreatePollChoiceModal({ addChoice, onRequestClose, ...rest }) {
    
    const [newChoice, setNewChoice] = useState("");

    function getNewChoice() {
        return { id: Math.random()*10000, title: newChoice };
    }

    return (
        <Modal
            // transparent={true}
            onBackdropPress={onRequestClose}
            hasBackdrop={true}
            backdropColor={"black"}
            backdropOpacity={1.0}
            style={{ margin: 0 }}
            onRequestClose={onRequestClose}
            {...rest}>
            <View style={style.container}>
                <View style={style.innerContainer}>
                    <Text style={style.text}>Type in Choice:</Text>
                    <TextInput
                        onChangeText={choice => setNewChoice(choice)}
                        multiline={true}
                        placeholder={"Option"}
                        style={style.textInput} />
                    <View style={style.buttonContainer}>
                        <ChoiceButton title={"Cancel"} white={true} onPress={() => addChoice()}/>
                        <ChoiceButton title={"Ok"} white={true} onPress={() => addChoice(getNewChoice())}/>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
