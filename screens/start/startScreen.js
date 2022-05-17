import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "@@components";
import style from './startScreen.style';
import { BackButton } from "@@components";

export default function StartScreen ({ navigation }) {
    return (
        <View style={style.container}>
            <Text>Hello World!</Text>
            <StatusBar style="auto" />
            <Button title={"To MainScreen"} onPress={() => { navigation.navigate('MainScreen') }}/>

        </View>
    )
}
