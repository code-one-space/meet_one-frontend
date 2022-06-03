import { SafeAreaView, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "@@components";
import style from "./confirmScreen.style";

export default function ConfirmScreen ({ navigation, route }) {
    let { followingScreen, message, functionToCall } = route.params;

    return (
        <SafeAreaView style={style.container}>
            <StatusBar style="auto" />
            <View style={style.womanContainer}>
                <Image style={style.woman} source={require("@@assets/confirmScreen_woman.png")}/>
            </View>
            <Text style={style.text}>{message}</Text>
            <View style={style.buttonContainer}>
                <Button style={style.button} title={"Yes"} onPress={() => {
                    followingScreen ? navigation.navigate(followingScreen) : functionToCall.call()
                } }/>
                <Button style={style.button} title={"No"} onPress={() => navigation.goBack()}/>
            </View>
        </SafeAreaView>
    )
}
