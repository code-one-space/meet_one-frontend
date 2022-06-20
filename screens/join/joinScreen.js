import { SafeAreaView, View, Image, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import  Button  from "components/button";
import style from './join.style';
import React from 'react';
import * as HttpClient from "../../shared/httpClient/httpClient";

export default function JoinScreen ({ navigation, route }) {
    const { meetingId } = route.params;
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
                placeholder={"Name"}
                multiline={true}
                numberOfLines={1}
                maxLength={30}
                style={style.text}/>
            <View style={style.buttonContainer}>
                <View style={style.button}>
                    <Button title={"Join"} onPress={() => {
                        if (personName.length < 2 || personName.length > 30) {
                            alert("Please insert a username with a length of at least 2 characters and maximum of 30 characters");
                        } else
                            HttpClient.joinMeeting(meetingId, personName);
                    }}/>
                </View>
            </View>
        </SafeAreaView>
    )
}
