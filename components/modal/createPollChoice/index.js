import { View, Text, Modal, TextInput } from "react-native";
import { useState } from "react";
import { Button } from "@@components";
import style from "./CreatePollChoiceModal.style";

export default function CreatePollChoiceModal({ visible, setVisible, choices, setChoices }) {
    const [choice, setChoice] = useState("");

    function handleCancelChoice() {
        setChoice("")
        setVisible(!visible)
    }

    function handleAddChoice() {
        setChoices([...choices, choice])
        setChoice("")
        setVisible(!visible)
    }

    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={() => setVisible(!visible)}>
            <View style={style.container}>
                <View style={style.innerContainer}>
                    <Text style={style.text}>Type in Choice:</Text>
                    <TextInput
                        value={choice}
                        onChangeText={setChoice}
                        multiline={true}
                        placeholder={"Choice"}
                        style={style.textInput}
                    />
                    <View style={style.buttonContainer}>
                        <Button title={"Cancel"} white={true} passedFontStyle={style.buttonFont} passedStyle={style.button} onPress={handleCancelChoice}/>
                        <Button title={"Ok"} white={true} passedFontStyle={style.buttonFont} passedStyle={style.button} onPress={handleAddChoice}/>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
