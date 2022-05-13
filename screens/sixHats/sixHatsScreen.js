import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "@@components";

export default function SixHatsScreen ({ navigation }) {
    return (
        <View>
            <Text>This is the SixHatsScreen</Text>
            <StatusBar style="auto" />
            <Button title={"End 6 Hats"} onPress={() => navigation.navigate("ConfirmScreen", { message: "Do you want to end 6 Hats?", followingScreen: "MainScreen" })}/>
        </View>
    )
}
