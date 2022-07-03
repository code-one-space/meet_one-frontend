import style from "./createSurveyScreen.style";
import { FlatList, SafeAreaView, TextInput, View, Text } from "react-native";
import { useState } from "react";
import { Button, CreateSurveyChoiceModal, EditChoiceListItem, AddFloatingActionButton } from "@@components";
import * as HttpClient from "../../shared/httpClient/httpClient";

export default function CreateSurveyScreen({ route }) {
    let { creatorName } = route.params;

    const [choices, setChoices] = useState([]);
    const [question, setQuestion] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [itemId, setItemId] = useState(null)

    function renderItem({ item }) {
        return (<EditChoiceListItem
            choice={item.title}
            onPressEdit={() => { setModalContent(item.title); setItemId(item.id); setModalVisible(true); }}
            onPressDelete={() => setChoices(choices.filter((choice) => choice.id != item.id))}/>)
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

    function submitSurvey() {
        if (question)
            HttpClient.createSurvey(question, creatorName, choices.map(choice => choice.title))
        else
            alert("Please type in a question first!");
    }

    return (
        <SafeAreaView style={style.container}>
            <CreateSurveyChoiceModal
                visible={modalVisible}
                addChoice={addChoice}
                editChoice={editChoice}
                onRequestClose={() => setModalVisible(false)} text={modalContent}/>
            <TextInput
                value={question}
                onChangeText={setQuestion}
                placeholder={"Question"}
                style={style.textInput}
                maxLength={30}/>
            <View style={style.separator}/>

            <View style={style.choicesHeader}>
                <Text style={style.choicesHeaderText}>Choices</Text>
                <AddFloatingActionButton onPress={() => { setModalContent(""); setItemId(null); setModalVisible(true) }}/>
            </View>

            <FlatList style={style.list} data={choices} renderItem={(item) => renderItem(item)} keyExtractor={item => item.id} />

            <Button title={"Submit"} buttonStyle={style.button} onPress={submitSurvey}/>
        </SafeAreaView>
    )
}
