import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "@@components";
import React from "react";
import style from './selectTools.style';


export default function SelectToolScreen ({ navigation }) {
    return (
        <View>
            <Text>This is the SelectToolScreen</Text>
            <StatusBar style="auto" />
            <View style={style.container}>
                <Button title={"To SelectPersonScreen"} onPress={() => navigation.navigate("SelectPersonScreen") }/>
            </View>

        </View>
    )
}
