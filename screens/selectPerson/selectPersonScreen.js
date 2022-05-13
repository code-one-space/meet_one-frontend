import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "@@components";

export default function SelectPersonScreen ({ navigation }) {
    return (
        <View>
            <Text>This is the SelectPersonScreen</Text>
            <StatusBar style="auto" />
            <Button title={"Create"} onPress={() => navigation.navigate("MainScreen")}/>
        </View>
    )
}
