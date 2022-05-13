import {Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import Button from "../../components/button";

export default function ConfirmScreen ({ navigation, route }) {
    let { followingScreen, message } = route.params;
    return (
        <View>
            <StatusBar style="auto" />
            <Text>{message}</Text>
            <Button title={"Yes"} onPress={() => navigation.navigate(followingScreen)}/>
            <Button title={"No"} onPress={() => navigation.goBack()}/>
        </View>
    )
}
