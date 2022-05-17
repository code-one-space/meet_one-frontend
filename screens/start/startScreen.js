import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "@@components";
import style from './startScreen.style';
import { BackButton } from "@@components";
import { Input } from "@@components";
import { ToolsListEtem } from "@@components";

export default function StartScreen ({ navigation }) {
    return (
        <View style={style.container}>
            <Text>Hello World!</Text>
            <StatusBar style="auto" />
            <ToolsListEtem title = {"6 Hüte"} date={"21.02.22"} time={"17:30"}  onPress={ () => {}}/>
            <Input />
            <Button title={"To MainScreen"} onPress={() => { navigation.navigate('MainScreen') }}/>
        </View>
    )
}
