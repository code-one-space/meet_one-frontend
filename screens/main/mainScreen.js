import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "@@components";
import { BackHandler } from "react-native";
import * as Navigation from "../../Navigation";

export default function MainScreen ({ navigation, route }) {

    const handleBackButton = () => {
        if (Navigation.getCurrentRouteName() === "MainScreen") {
            callConfirmScreen(navigation);
            return true;
        }

        BackHandler.exitApp();
        return true;
    }

    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return (
        <View>
            <Text>This is the MainScreen</Text>
            <StatusBar style="auto" />
            <Button title={"Leave Team"} onPress={() => callConfirmScreen(navigation)}/>
            <Button title={"Add Tool"} onPress={() => navigation.navigate("SelectToolScreen")}/>
        </View>
    )
}

const callConfirmScreen = navigation => {
    navigation.navigate(
        "ConfirmScreen",
        { message: "Do you want to leave the Team?", followingScreen: "StartScreen" }
    )
}
