import React from 'react';
import {Text, TextInput, SafeAreaView,TouchableOpacity, View} from 'react-native';
import style from './textinput.style';

export default function Input ({onPress}) {

    const [text, onChangeText] = React.useState("");

    return (
        <SafeAreaView>
            <TextInput
                style={style.text}
                onChangeText={onChangeText}
                value={text}
                placeholder="Name eintragen"
                />
        </SafeAreaView>
    );
}
