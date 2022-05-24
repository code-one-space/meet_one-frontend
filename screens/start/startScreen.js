import { SafeAreaView,Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, BackButton } from "@@components";
import style from './startScreen.style';
import React from 'react';
import * as HttpClient from "../../HttpClient";

export default function StartScreen ({ navigation }) {

    const [personName, setName] = React.useState('');
    const goToMainScreen = () => {
        navigation.navigate('MainScreen', {
            personName,
        });
    };

    return (
        <SafeAreaView style={style.container}>
            <StatusBar style="auto" />
            <View style={style.frau}/>
            <Input
                onChangeText={text => setName(text)}
                value={personName}/>
            <View style={style.buttonContainer}>
                <View style={style.button}>
                    <Button title={"Start"} onPress={() => HttpClient.createMeeting("Janik", "Neues Meeting")}/>
                </View>
                <View style={style.button}>
                    <Button title={"Scan"} style={style.button} onPress={() => navigation.navigate('ScanScreen')}/>
                </View>
            </View>
        </SafeAreaView>
    )
}
