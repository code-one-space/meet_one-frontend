import { SafeAreaView, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "@@components";
import style from "./confirmScreen.style";

export default function ConfirmScreen ({ navigation, route }) {
    let { followingScreen, message, functionToCall, config, params } = route.params;

    return (
        <SafeAreaView style={style.container}>
            <StatusBar style="auto" />
            <View style={style.womanContainer}>
                <Image style={style.woman} source={require("@@assets/confirmScreen_woman.png")}/>
            </View>
            <Text style={style.message}>{message}</Text>
            <View style={style.buttonContainer}>
                <View style={style.singleButtonContainer}>
                    <Button title={"Yes"} onPress={() =>
                    followingScreen ? navigation.navigate(followingScreen, config) : functionToCall.apply(null, params)
                    }/>
                </View>
                <View style={style.singleButtonContainer}>
                    <Button title={"No"} onPress={() => navigation.goBack()}/>
                </View>
            </View>
        </SafeAreaView>
    )
}
