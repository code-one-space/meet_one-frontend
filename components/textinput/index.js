import React from 'react';
import { TextInput } from 'react-native';
import style from './textinput.style';

export default function Input ({onChangeText}) {

    return (
        <TextInput
            style={style.text}
            onChangeText={onChangeText}
            placeholder="Name eintragen"
            />
    );
}
