import { Text, View, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "@@components";
import style from './startScreen.style';
import * as HttpClient from "../../HttpClient";

export default function StartScreen ({ navigation }) {
    return (
        <SafeAreaView style={style.container}>
            <StatusBar style="auto" />
            <View style={style.frau}/>
            <View title={"Text Input Dummy"} style={style.textInput}/>
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
