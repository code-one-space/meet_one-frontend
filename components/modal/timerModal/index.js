import {View, TextInput, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback} from "react-native";
import style from "./timerModal.style";
import Modal from "react-native-modal"
import React, { useState } from "react";
import * as Icon from "react-native-feather";
import { TextInputMask } from 'react-native-masked-text'
import { Button } from "@@components";

export default function TimerModal({ handleStopTimer, setTimerInput, handleStartTimer, onRequestClose, visible, value }) {

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Modal
            hasBackdrop={true}
            transparent={true}
            visible={visible}
            style={{ margin: 0 }}
            onRequestClose={onRequestClose}
            onBackdropPress={onRequestClose}
            onBackButtonPress={onRequestClose}>
            <View style={style.container} >
                <View style={style.innerContainer}>
                    <Text style={style.text}>Timer</Text>
                    <TextInputMask
                        type={"custom"}
                        options={{
                            mask: "99:99:99"
                        }}
                        value={value}
                        onChangeText={(value) => setTimerInput(value)}
                        placeholder="00:00:00"
                        maxLength={8}
                        mask={"[00]:[00]:[00]"}
                        keyboardType="numeric"
                        style={style.textInput}
                        multiline={true}
                        numberOfLines={1}
                    />
                    <View style={style.buttonContainer}>

                        <TouchableOpacity style={style.button} onPress={() => handleStartTimer()}>
                            <Icon.Play stroke="white" fill="#000000" width={40} height={40} />
                        </TouchableOpacity>

                        <TouchableOpacity style={style.button} onPress={() => handleStopTimer(false)}>
                            <Icon.Square stroke="white" fill="#000000" width={30} height={30} />
                        </TouchableOpacity>
                    </View>
                    <Button white={true} title={"Close"} onPress={onRequestClose}/>
                </View>
            </View>
        </Modal>
        </TouchableWithoutFeedback>
    )
}
