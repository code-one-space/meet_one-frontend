import {Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import Button from "../../components/button";
import style from './style';

export default function StartScreen () {
    return (
        <View style={style.container}>
            <Text>Hello World!</Text>
            <StatusBar style="auto" />
            <Button title={"asdf"}/>
        </View>
    )
}
