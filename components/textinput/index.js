import React from 'react';
import { TextInput, SafeAreaView,} from 'react-native';
import style from './textinput.style';

export default function Input ({onPress}) {

    return (
        <SafeAreaView>
            <TextInput
                style={style.text}
                placeholder="Name eintragen"
                />
        </SafeAreaView>
    );
}
