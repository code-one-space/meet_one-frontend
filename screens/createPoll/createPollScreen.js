import style from "./createPollScreen.style";
import {FlatList, SafeAreaView, TextInput, View, Text, Switch} from "react-native";
import {useState} from "react";
import { Button, CreatePollChoiceModal, AddFAB } from "@@components";
import EditChoiceListItem from "../../components/editChoiceListItem";

export default function CreatePollScreen() {
    const [choices, setChoices] = useState([]);
    const [textInputfield, setTextInputfield] = useState(false);
    const [question, setQuestion] = useState("");
    const [selectedChoice, setSelectedChoice] = useState(undefined);

    const [modalVisible, setModalVisible] = useState(false);

    function handleEditChoice(choice) {
        setSelectedChoice(choice);
        setModalVisible(!modalVisible);
    }

    function handleCreateChoice() {
        setSelectedChoice(undefined);
        setModalVisible(!modalVisible);
    }

    function renderItem(choiceInList) {
        return <EditChoiceListItem
            choice={choiceInList.item.text}
            onPressDelete={() => setChoices(choices.filter((choice) => choice.uuid != choiceInList.item.uuid))}
            onPressEdit={() => handleEditChoice(choiceInList.item)}
        />
    }

    return (
        <SafeAreaView style={style.container}>
            <CreatePollChoiceModal
                visible={modalVisible}
                setVisible={setModalVisible}
                choices={choices}
                setChoices={setChoices}
                selectedChoice={selectedChoice}
                setSelectedChoice={setSelectedChoice}/>
            <TextInput
                value={question}
                onChangeText={setQuestion}
                placeholder={"Question"}
                style={style.textInput}
                maxLength={30}
            />

            <View style={style.selectOtherAnswerContainer}>
                <Text style={style.selectOtherAnswerText}>Add text input field</Text>
                <Switch
                    trackColor={{ false: "lightgrey", true: "grey" }}
                    thumbColor={ "black" }
                    ios_backgroundColor={"white"}
                    onValueChange={setTextInputfield}
                    value={textInputfield}
                    style={style.selectOtherAnswerSwitch}
                />
            </View>
            <View style={style.separator}/>
            <View style={style.choicesHeader}>
                <Text style={style.choicesHeaderText}>Choices</Text>
                <AddFAB onPress={handleCreateChoice}/>
            </View>
            <FlatList style={style.list} data={choices} renderItem={renderItem}/>

            <Button title={"Submit"} passedStyle={style.button} onPress={handleCreateChoice}/>
        </SafeAreaView>
    )
}