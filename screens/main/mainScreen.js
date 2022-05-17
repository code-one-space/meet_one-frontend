import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, ShareButton, BackButton } from "@@components";

export default function MainScreen ({ navigation }) {
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
