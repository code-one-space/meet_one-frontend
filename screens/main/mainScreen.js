import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "@@components";
import { Input } from "@@components";

export default function MainScreen ({ navigation }) {
    const handleBackButton = () => {
        if (Navigation.getCurrentRouteName() === "MainScreen") {
            callConfirmScreen(navigation);
            return true;
        } else if (Navigation.getCurrentRouteName() === "StartScreen") {
            BackHandler.exitApp();
            return true;
        }
        navigation.goBack();
        return true;
    }
    return (
        <View>
            <Text>This is the MainScreen</Text>
            <StatusBar style="auto" />

            <Button title={"Leave Team"} onPress={() => navigation.navigate(
                "ConfirmScreen",
                { message: "Do you want to leave the Team?", followingScreen: "StartScreen" }
            )}/>
            <Button title={"Add Tool"} onPress={() => navigation.navigate("SelectToolScreen")}/>
        </View>
    )
}
