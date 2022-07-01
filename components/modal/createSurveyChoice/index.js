import { View, Text, TextInput } from "react-native";
import { useEffect, useState } from "react";
import ChoiceButton from "../../buttons/choiceButton";
import style from "./createSurveyChoiceModal.style";
import Modal from "react-native-modal";

export default function CreateSurveyChoiceModal({ addChoice, editChoice, onRequestClose, itemId, title, text, choiceItem, ...rest }) {
    
    useEffect(() => {
        setNewChoice(text ?? newChoice)
    }, [text])
    
    const [newChoice, setNewChoice] = useState(text);

    function getNewChoice() {
        return { id: ~~(Math.random()*10000), title: newChoice };
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
                    <Text style={style.text}>{ text ? "Edit option" : "Add option" }</Text>
                    <TextInput
                        onChangeText={choice => setNewChoice(choice)}
                        multiline={true}
                        placeholder={"Option"}
                        style={style.textInput}
                        value={newChoice} />
                    <View style={style.buttonContainer}>
                        <ChoiceButton title={"Cancel"} white={true} onPress={() => { onRequestClose(); setNewChoice(text); }}/>
                        <ChoiceButton title={"Ok"} white={true} onPress={() => { text ? editChoice(newChoice) : addChoice(getNewChoice()); setNewChoice(""); }}/>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
