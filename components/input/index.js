import React from 'react';
import {Text, TextInput, SafeAreaView,TouchableOpacity, View} from 'react-native';
import style from './textinput.style';

export default function Input () {

    const [text, onChangeText] = React.useState("Name eintragen");

    return (
        <SafeAreaView>
            <TextInput
                style={style.text}
                       value={text}
            Placeholder = "Name eintragen"/>
        </SafeAreaView>
    );
}
