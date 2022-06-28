import {View, TextInput, Text, TouchableOpacity} from "react-native";
import  ChoiceButton  from "../../buttons/choiceButton";
import style from "./timerModal.style";
import Modal from "react-native-modal"
import React, {useState} from "react";
import * as Icon from "react-native-feather";



export default function TimerModal({ timePropsVisible, setTimePropsVisible, handelStopTimer, timerEnd, handelStartTimer }) {

    const [stop, setStop] = useState(true);
    let [time, setTime] = useState("");
    function PauseStopButton() {
        if (stop)
            return  <Icon.Play stroke="white" fill="#000000" width={40} height={40}/>
        else {
            return  <Icon.Pause stroke="white" fill="#000000" width={35} height={35}/>
        }
    }
    let newData;
    const rechneDataToTime = (data) => {
        let output;
        console.log(data)
        if(data){
            data = data.split(":");
            output= parseInt(data[0],10) * 60 * 60 * 1000 + parseInt (data[1],10) * 60 * 1000  +  parseInt (data[2],10)  * 1000;
        }
        return new Date(Date.now() + output).getTime();
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
                        value={timerEnd}
                        onChangeText={(value) =>  setTime(value) }
                        placeholder="00:00:00"
                        maxLength={8}
                        keyboardType="numeric"
                        style={style.textInput}
                        multiline = {true}
                        numberOfLines = {1}
                    />
                    <View style={style.buttonContainer}>
                        <TouchableOpacity style={style.button} onPress={ () =>{
                           // setTimerEnd(rechneDataToTime(newData));
                            handelStartTimer(rechneDataToTime(time));
                            console.log("data from rechneDataToTime : "  + rechneDataToTime(time))
                            //setTimerEnd(timerEnd);
                            setTimePropsVisible(false);}
                        }>
                            {PauseStopButton()}
                        </TouchableOpacity>
                        <TouchableOpacity style={style.button} onPress={ () => {
                            handelStopTimer();
                            setTimePropsVisible(false)}}>
                            <Icon.Square stroke="white" fill="#000000" width={30} height={30}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
