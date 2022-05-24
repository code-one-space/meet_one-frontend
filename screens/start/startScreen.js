import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "@@components";
import { Input } from "@@components";
import style from './startScreen.style';
import React from "react";
import { useNavigation } from '@react-navigation/native';


export default function StartScreen ({ navigation }) {

    const [personName, setName] = React.useState('');
    const goToMainScreen = () => {
        navigation.navigate('MainScreen', {
            personName,
        });
    };

    return (
        <View style={style.container}>
            <Text>Hello World!</Text>
            <StatusBar style="auto" />
            <Input
                    onChangeText={text => setName(text)}
                    value={personName}/>
            <Button title={"To MainScreen"} onPress={() => { goToMainScreen() }}/>
        </View>
    )

}

