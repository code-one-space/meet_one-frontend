import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "@@components";

export default function ConfirmScreen ({ navigation, route }) {
    let { followingScreen, message, functionToCall } = route.params;

    return (
        <View>
            <StatusBar style="auto" />
            <Text>{message}</Text>
            <Button title={"Yes"} onPress={() => followingScreen ? navigation.navigate(followingScreen) : functionToCall.call() }/>
            <Button title={"No"} onPress={() => navigation.goBack()}/>
        </View>
    )
}
