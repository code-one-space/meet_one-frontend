import {Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import Button from "../../components/button";

export default function MainScreen ({ navigation }) {
    navigation.setOptions({
        headerRight: () => <Button title={"Share"} onPress={() => navigation.navigate("ShareScreen")}/>,
        headerLeft: null
    });
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
