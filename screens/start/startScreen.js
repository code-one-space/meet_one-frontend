import { SafeAreaView, View, Image, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import  Button  from "components/button";
import ToolsList from "components/toolsList/toolsList";
import style from './startScreen.style';
import React from 'react';
import * as HttpClient from "../../HttpClient";

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
            <View style={style.frauContainer}>
                <Image style={style.frau} source={require("@@assets/startScreenWoman.png")}/>
            </View>
            <TextInput
                onChangeText={nameChangeHandler}
                value={personName}
                style={style.text}/>
            <View style={style.buttonContainer}>
                <View style={style.button}>
                    <Button title={"Start"} onPress={() => HttpClient.createMeeting(personName, personName + "'s Meeting")}/>
                </View>
                <View style={style.button}>
                    <Button title={"Scan"} style={style.button} onPress={() => navigation.navigate('ScanScreen', { personName: personName })}/>
                    <Button title={"add Tools "} style={style.button} onPress={() => navigation.navigate('SelectToolScreen', { personName: personName })}/>
                </View>
            </View>
        </SafeAreaView>
    )
}
