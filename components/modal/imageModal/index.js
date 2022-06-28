import { View, Text, TouchableOpacity, Image } from "react-native";
import Button from "../../buttons/button";
import style from "./imageModal.style";
import Modal from "react-native-modal";

export default function ImageModal({ onRequestClose, title, image, text, ...rest }) {
    return (
        <Modal
            // makes status bar at top see through
            // statusBarTranslucent={true}
            
            // transparent={true}
            onBackdropPress={onRequestClose}
            onRequestClose={onRequestClose}
            // coverScreen={true}
            hasBackdrop={true}
            backdropColor={"black"}
            backdropOpacity={1.0}
            style={{ margin: 0 }}
            {...rest}>
            <TouchableOpacity style={style.container} onPress={onRequestClose}>
                <View style={style.innerContainer}>
                    <Text style={style.title}>{title}</Text>
                    <View style={style.imageContainer}>
                        <Image style={style.image} source={image}></Image>
                    </View>
                    <Text style={style.text}>{text}</Text>
                    <Button title={"Ok"} white={true} onPress={onRequestClose} buttonStyle={style.button} />
                </View>
            </TouchableOpacity>
        </Modal>
    )
}
