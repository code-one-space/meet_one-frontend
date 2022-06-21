import style from "./createPollScreen.style";
import { FlatList, SafeAreaView, TextInput, View, Text } from "react-native";
import { useState } from "react";
import { Button, CreatePollChoiceModal, EditChoiceListItem } from "@@components";

export default function CreatePollScreen() {

    const [choices, setChoices] = useState([]);
    const [question, setQuestion] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    function renderItem({ item }) {
        return <EditChoiceListItem choice={item.title} />
    }

    function addChoice(choice) {

        if(choice)
            setChoices([...choices, choice])

        // always close modal
        setModalVisible(false)
    }

    return (
        <SafeAreaView style={style.container}>
            <CreatePollChoiceModal visible={modalVisible} addChoice={addChoice} onRequestClose={() => setModalVisible(false)} />
            <TextInput
                value={question}
                onChangeText={setQuestion}
                placeholder={"Question"}
                style={style.textInput}
                maxLength={30}
            />
            <View style={style.separator}/>

            <FlatList data={choices} renderItem={renderItem} keyExtractor={item => item.id} />

            <Button title={"Add choice"} buttonStyle={style.button} onPress={() => setModalVisible(true)}/>
        </SafeAreaView>
    )
}