import {Text, ScrollView,SafeAreaView, FlatList , View,} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "@@components";
import { BackHandler } from "react-native";
import { PersonButton } from "@@components";
import * as Navigation from "../../Navigation";
import {useState} from "react";

export default function MainScreen ({ navigation }) {

    const [initialPersonen, changeEl]  = useState([
    ]);
    const [exampleState, setExampleState] = useState(initialPersonen);
    const [idx, incr] = useState(0);

    const addPerson = () => {
        var newArray = [...initialPersonen , {id : idx, text: "Person " + (idx+1) }];
        incr(idx + 1);
        //console.log(initialElements.length);
        setExampleState(newArray);
        changeEl(newArray);
    }

    const handleBackButton = () => {
        if (Navigation.getCurrentRouteName() === "MainScreen") {
            callConfirmScreen(navigation);
            return true;
        } else if (Navigation.getCurrentRouteName() === "StartScreen") {
            BackHandler.exitApp();
            return true;
        }
        navigation.goBack();
        return true;
    }

    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return (
        <View>

            <View>
                <Text>This is the MainScreen</Text>
                <StatusBar style="auto" />
            </View>

            <View style = {{height: 400}}>
                            <FlatList
                                nestedScrollEnabled
                                keyExtractor = {item => item.id}
                                data={exampleState}
                                renderItem = {item => (
                                <Button title={item.item.text} onPress={() => {}}/>
                                    )}
                            />


            </View>

            <View>
                <Button
                    title="Add Person"
                    onPress={addPerson} />
                <Button title={"Leave Team"} onPress={() => callConfirmScreen(navigation)}/>
                <Button title={"Add Tool"} onPress={() => navigation.navigate("SelectToolScreen")}/>
            </View>

        </View>

    );
}

const callConfirmScreen = navigation => {
    navigation.navigate(
        "ConfirmScreen",
        { message: "Do you want to leave the Team?", followingScreen: "StartScreen" }
    )
}
