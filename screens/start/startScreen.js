import { SafeAreaView, View, Image, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, InfoModal, IconButton } from "@@components";
import style from './startScreen.style';
import { useState } from 'react';
import * as HttpClient from "../../shared/httpClient/httpClient";
import { Camera } from "react-native-feather";

export default function StartScreen ({ navigation }) {

    const [personName, setName] = useState('')
    let [modalVisible, setModalVisible] = useState(false)

    const nameChangeHandler = value => {
        if (value)
            setName(value);
        else
            setName("");
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={style.container}>
            <StatusBar style="auto" />
            <InfoModal 
                title={"Invalid username"}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                text={"Please insert a username with a length of at least 2 characters and maximum of 30 characters"} />
            <View style={style.womanContainer}>
                <Image style={style.woman} source={require("@@assets/startScreenWoman.png")}/>
            </View>
            <TextInput
                onChangeText={nameChangeHandler}
                value={personName}
                placeholder={"Name"}
                multiline={true}
                numberOfLines={1}
                maxLength={30}
                style={style.text}/>
            <View style={style.buttonContainer}>
                <View style={style.button}>
                    <IconButton iconName={"start"} text={"Create Meeting"} textStyle={{ left: -2 }} buttonStyle={style.iconButtonContainer} onPress={() => {
                        if (personName.length < 2 || personName.length > 30) {
                            setModalVisible(true)
                        } else
                            HttpClient.createMeeting(personName, personName + "'s Meeting")
                    }}/>
                    <IconButton iconName={"camera"} text={"Join meeting"} textStyle={{ left: 2 }} buttonStyle={style.iconButtonContainer} onPress={() => {
                        if (personName.length < 2 || personName.length > 30) {
                            setModalVisible(true)
                        } else
                            navigation.navigate('ScanScreen', { personName: personName })
                    }}/>
                </View>
            </View>
        </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
