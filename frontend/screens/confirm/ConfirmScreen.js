import {Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import Button from "../../components/button";

export default function ConfirmScreen ({ navigation, followingScreen, message }) {
    return (
        <View>
            <StatusBar style="auto" />
            <Text>{message}</Text> {/* TODO Text is not visible? */}
            <Button title={"Yes"} onPress={() => navigation.navigate(followingScreen)}/> {/* TODO this is not working */}
            <Button title={"No"} onPress={() => navigation.goBack()}/>
        </View>
    )
}
