import style from "./createSurveyScreen.style";
import { FlatList, SafeAreaView, TextInput, View } from "react-native";
import { useState } from "react";
import { Button, CreateSurveyChoiceModal, EditChoiceListItem } from "@@components";

export default function CreateSurveyScreen() {

    const [choices, setChoices] = useState([]);
    const [question, setQuestion] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [itemId, setItemId] = useState(null)

    function renderItem({ item }) {
        return <EditChoiceListItem choice={item.title} onPressEdit={() => { setModalContent(item.title); setItemId(item.id); setModalVisible(true); }} />
    }

    function addChoice(choice) {

        if(choice)
            setChoices([...choices, choice])

        // always close modal
        setModalVisible(false)
    }

    function editChoice(choice) {

        let choicesArr = []

        for(item of choices) {
            if(item.id == itemId)
                item.title = choice

            choicesArr.push(item)
        }

        if(choice)
            setChoices([...choicesArr])

        // always close modal
        setModalVisible(false)
    }

    return (
        <SafeAreaView style={style.container}>
            <CreateSurveyChoiceModal visible={modalVisible} addChoice={addChoice} editChoice={editChoice} onRequestClose={() => setModalVisible(false)} text={modalContent} />
            <TextInput
                value={question}
                onChangeText={setQuestion}
                placeholder={"Question"}
                style={style.textInput}
                maxLength={30}
            />
            <View style={style.separator}/>

            <FlatList data={choices} renderItem={renderItem} keyExtractor={item => item.id} />

            <Button title={"Add choice"} buttonStyle={style.button} onPress={() => { setModalContent(undefined); setItemId(null); setModalVisible(true) }}/>
        </SafeAreaView>
    )
}