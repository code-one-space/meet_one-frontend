import {View, TextInput, Text, TouchableOpacity} from "react-native";
import  ChoiceButton  from "../../buttons/choiceButton";
import style from "./timerModal.style";
import Modal from "react-native-modal"
import React, {useState} from "react";
import * as Icon from "react-native-feather";



export default function TimerModal({ timePropsVisible, setTimePropsVisible, setInput, input }) {
    const [stop, setStop] = useState(true);

    function PauseStopButton() {
        if (stop)
            return  <Icon.Play stroke="white" fill="#000000" width={40} height={40}/>
        else {
          return  <Icon.Pause stroke="white" fill="#000000" width={35} height={35}/>
        }

    }

    return (
        <Modal
            animationType="slide"
            hasBackdrop={true}
            transparent={true}
            visible={timePropsVisible}
            style={{ margin: 0 }}
            onRequestClose={() => {
                setTimePropsVisible(!timePropsVisible);}}>
            <View style = { style.container} >
                <View style={style.innerContainer}>

                    <Text style={style.text}>Enter your time in minutes</Text>
                    <TextInput
                        value={input}
                        onChangeText={(value) => setInput(value)}
                        placeholder="00:00:00"
                        maxLength={3}
                        keyboardType="numeric"
                        style={style.textInput}/>
                    <View style={style.buttonContainer}>
                        <TouchableOpacity style={style.button} onPress={ () => setTimePropsVisible(false)}>
                            {PauseStopButton()}
                        </TouchableOpacity>
                        <TouchableOpacity style={style.button} onPress={ () => setTimePropsVisible(false)}>
                            <Icon.Square stroke="white" fill="#000000" width={30} height={30}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
