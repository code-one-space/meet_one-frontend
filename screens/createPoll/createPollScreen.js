import style from "./createPollScreen.style";
import { FlatList, SafeAreaView, TextInput, View } from "react-native";
import { useState } from "react";
import { Button, CreatePollChoiceModal } from "@@components";
import EditChoiceListItem from "../../components/modal/createPollChoice/index";

export default function CreatePollScreen() {
    const [choices, setChoices] = useState([]);
    const [question, setQuestion] = useState("");

    const [modalVisible, setModalVisible] = useState(false);

    function renderItem(choice) {
        return <EditChoiceListItem choice={choice.item}/>
    }

    return (
        <SafeAreaView style={style.container}>
            <CreatePollChoiceModal visible={modalVisible} setVisible={setModalVisible} choices={choices} setChoices={setChoices}/>
            <TextInput
                value={question}
                onChangeText={setQuestion}
                placeholder={"Question"}
                style={style.textInput}
                maxLength={30}
            />
            <View style={style.separator}/>

            <FlatList data={choices} renderItem={renderItem}/>

            <Button title={"Add choice"} passedStyle={style.button} onPress={() => setModalVisible(!modalVisible)}/>
        </SafeAreaView>
    )
}