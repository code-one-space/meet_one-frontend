import style from "./createPollScreen.style";
import { SafeAreaView, TextInput } from "react-native";

export default function CreatePollScreen() {
    return (
        <SafeAreaView style={style.container}>
            <TextInput placeholder={"Question"} style={style.textInput}/>
        </SafeAreaView>
    )
}