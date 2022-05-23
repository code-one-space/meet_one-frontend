import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "@@components";
import { Input } from "@@components";
import style from './startScreen.style';
import React from "react";



export default function StartScreen ({ navigation }) {
    const [name, onChangeText] = React.useState("");
    return (
        <View style={style.container}>
            <Text>Hello World!</Text>
            <StatusBar style="auto" />
            <Input
                    onChangeText={onChangeText}
                    value={name}/>
            <Button title={"To MainScreen"} onPress={() => { navigation.navigate('MainScreen') }}/>
        </View>
    )
}
