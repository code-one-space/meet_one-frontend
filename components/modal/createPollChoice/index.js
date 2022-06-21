import { View, Text, Modal, TextInput } from "react-native";
import { useState } from "react";
import { Button } from "@@components";
import style from "./createPollChoiceModal.style";

const { v4: uuidv4 } = require("uuid");

export default function CreatePollChoiceModal({ visible, setVisible, choices, setChoices, selectedChoice, setSelectedChoice }) {
    console.log(selectedChoice);
    console.log(selectedChoice?.text);
    const [newChoiceText, setNewChoiceText] = useState(!selectedChoice ? "Choice was selected" : "");

    function handleCancelChoice() {
        setNewChoiceText("")
        setVisible(!visible)
    }

    function handleAddChoice() {
        if (selectedChoice) {
            selectedChoice.text = newChoiceText;
            setSelectedChoice(undefined);
        } else if (choices) {
            setChoices([...choices, {text: newChoiceText, uuid: uuidv4()}]);
        }
        setNewChoiceText("");
        setVisible(!visible);
    }

    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={() => setVisible(!visible)}>
            <View style={style.container}>
                <View style={style.innerContainer}>
                    <Text style={style.text}>{!selectedChoice ? "Type in choice:" : "Edit choice:"}</Text>
                    <TextInput
                        value={newChoiceText}
                        onChangeText={setNewChoiceText}
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
