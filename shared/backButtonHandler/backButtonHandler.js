import * as Navigation from "../navigation/navigation";
import {BackHandler} from "react-native";
import * as HttpClient from "../httpClient/httpClient";
import {useCallback} from "react";

export function handleBackButton() {
    console.log("current Route: " + Navigation.getCurrentRouteName())
    if (Navigation.getCurrentRouteName() === "MainScreen") {
        Navigation.navigate(
            "ConfirmScreen",
            { message: "Do you want to leave the Team?", functionToCall: HttpClient.leaveMeeting }
        )
        return true;
    } else if (Navigation.getCurrentRouteName() === "StartScreen") {
        BackHandler.exitApp();
        return true;
    }

    Navigation.goBack();
    return true;
}
