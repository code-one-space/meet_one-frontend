import style from "./createPollScreen.style";
import {FlatList, SafeAreaView, TextInput, View, Text} from "react-native";
import {useState} from "react";
import { Button, CreatePollChoiceModal } from "@@components";
import EditChoiceListItem from "../../components/editChoiceListItem";

export default function CreatePollScreen() {
    const [choices, setChoices] = useState([]);
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
            <View style={style.separator}/>

            <FlatList style={style.list} data={choices} renderItem={renderItem}/>

            <Button title={"Add choice"} passedStyle={style.button} onPress={() => handleCreateChoice()}/>
        </SafeAreaView>
    )
}