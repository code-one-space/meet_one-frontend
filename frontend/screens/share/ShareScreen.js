import {Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import Button from "../../components/button";

export default function ShareScreen ({ navigation }) {
    return (
        <View>
            <Text>This is the ShareScreen</Text>
            <StatusBar style="auto" />
        </View>
    )
}
