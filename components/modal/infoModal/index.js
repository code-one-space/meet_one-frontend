import { View, Text, Modal } from "react-native";
import { Button } from "../../button";
import style from "./infoModal.style";

export default function InfoModal({ onRequestClose, title, text, ...rest }) {

    return (
        <Modal
            transparent={true}
            onRequestClose={onRequestClose}
            {...rest}>
            <View style={style.container}>
                <View style={style.innerContainer}>
                    <Text style={style.text}>{title}</Text>
                    <Text style={style.infoText}>{text}</Text>
                    <Button title={"Ok"} white={true} passedFontStyle={style.buttonFont} passedStyle={style.button} onPress={onRequestClose}/>
                </View>
            </View>
        </Modal>
    )
}
