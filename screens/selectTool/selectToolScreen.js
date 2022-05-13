import {Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import Button from "../../components/button";

export default function SelectToolScreen ({ navigation }) {
    return (
        <View>
            <Text>This is the SelectToolScreen</Text>
            <StatusBar style="auto" />
            <Button title={"To SelectPersonScreen"} onPress={() => navigation.navigate("SelectPersonScreen") }/>
        </View>
    )
}
