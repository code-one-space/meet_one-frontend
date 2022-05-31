import { SafeAreaView, View, Image, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import  Button  from "components/button";
import style from './startScreen.style';
import React from 'react';
import * as HttpClient from "../../shared/httpClient/httpClient";

export default function StartScreen ({ navigation }) {

    const [personName, setName] = React.useState('');

    const nameChangeHandler = value => {
        if (value)
            setName(value);
        else
            setName("");
    }

    return (
        <SafeAreaView style={style.container}>
            <StatusBar style="auto" />
            <View style={style.womanContainer}>
                <Image style={style.woman} source={require("@@assets/startScreenWoman.png")}/>
            </View>
            <TextInput
                onChangeText={nameChangeHandler}
                value={personName}
                maxLength={30}
                style={style.text}/>
            <View style={style.buttonContainer}>
                <View style={style.button}>
                    <Button title={"Start"} onPress={() => {
                        console.log(personName.length)
                        if (personName.length < 2 || personName.length > 30) {
                            alert("Please insert a username with a length of at least 2 characters and maximum of 30 characters");
                        } else
                            HttpClient.createMeeting(personName, personName + "'s Meeting")
                    }}/>
                </View>
                <View style={style.button}>
                    <Button title={"Scan"} style={style.button} onPress={() => {
                        if (personName.length < 2 || personName.length > 30) {
                            alert("Please insert a username with a length of at least 2 characters and maximum of 30 characters");
                        } else
                            navigation.navigate('ScanScreen', { personName: personName })
                    }}/>
                </View>
            </View>
        </SafeAreaView>
    )
}
