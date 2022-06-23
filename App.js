import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Notes, Start, Confirm, Main, Scan, SelectPerson, SelectTool, Share, Join, CreateSurvey } from "@@screens";
import { ShareButton, navigationBarStyle, BackButton } from "@@components";
import { navigationRef } from "./shared/navigation/navigation";
import { LogBox } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import AppLoading from "expo-app-loading";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
import { Sen_400Regular, Sen_700Bold, useFonts } from "@expo-google-fonts/sen"
import * as HttpClient from "./shared/httpClient/httpClient";
import * as Navigation from "./shared/navigation/navigation";

const Stack = createNativeStackNavigator();

const prefix = Linking.createURL("/")

export default function App() {
    LogBox.ignoreLogs(["Warning: ..."]); // TODO remove this after Review #3
    LogBox.ignoreAllLogs();

    let [navigationData, setNavigationData] = useState(null)
    let [urlHandle, setUrlHandle] = useState(null)

    const linking = {
        prefixes: [prefix],
        config: {
            screens: {
                JoinScreen: "joinscreen"
            }
        }
    }

    // Linking.getInitialURL().then(url => {
    //     if (url) {
    //         let { queryParams } = Linking.parse(url);
    //         console.log("param: " + JSON.stringify(queryParams))
    //         if (queryParams?.meetingId && !HttpClient.meetingId) {
    //             Navigation.navigate("JoinScreen", queryParams);
    //         }
    //     }
    // }).catch(console.error);

    useEffect(() => {

        function handleDeepLink(event) {
            let data = Linking.parse(event?.url)
            setNavigationData(data)

            // check if person wants to join same meeting
            if(HttpClient?.meetingId?.toLowerCase() == data?.queryParams?.meetingId?.toLocaleLowerCase()) {

                // don't allow rejoin, navigate to meeting screen
                Navigation.navigate("MainScreen", data?.queryParams);
                return;
            }

            // if person is in a meeting and wants to join another one ask for leave before joining
            if (data?.queryParams?.meetingId && HttpClient.meetingId) {
                Navigation.navigate("ConfirmScreen", { message: "Do you want to leave the team and join another meeting?", functionToCall: HttpClient.leaveMeeting, params: ["JoinScreen", data?.queryParams] });
            }

            // join if nothing else applies
            if (data?.queryParams?.meetingId && !HttpClient.meetingId) {
                Navigation.navigate("JoinScreen", data?.queryParams);
            }
        }

        async function getInitialURL() {
            const initialURL = await Linking.getInitialURL()
            if(initialURL) setNavigationData(Linking.parse(initialURL))
        }

        setUrlHandle(Linking.addEventListener("url", handleDeepLink))

        if(!navigationData) {
            getInitialURL()
        }

        return () => {
            if(urlHandle) {
                urlHandle.remove()
            }
        }
    }, [])

    useEffect(() => {
        (async () => {
            await SplashScreen.preventAutoHideAsync();
        })()
    }, []);

    let [fontsLoaded] = useFonts({
        Sen_400Regular: Sen_400Regular,
        Sen_700Bold: Sen_700Bold
    })

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <NavigationContainer ref={navigationRef} linking={linking}>
            <Stack.Navigator screenOptions={navigationBarStyle}>
                <Stack.Screen
                    name="StartScreen"
                    component={Start}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AllNotesScreen"
                    component={Notes}
                    options={{ headerLeft: () => <BackButton/> }}
                />
                <Stack.Screen
                    name="ConfirmScreen"
                    component={Confirm}
                    options={{
                        title: "",
                        headerLeft: () => <BackButton/>
                    }}
                />
                <Stack.Screen
                    name="MainScreen"
                    component={Main}
                    options={{
                        title: "Team",
                        headerRight: () => <ShareButton />,
                        headerLeft: () => <BackButton />,
                    }}
                />
                <Stack.Screen
                    name="ScanScreen"
                    component={Scan}
                    options={{
                        title: "Scan QR-Code",
                        headerLeft: () => <BackButton/>,
                    }}
                />
                <Stack.Screen
                    name="SelectPersonScreen"
                    component={SelectPerson}
                    options={{
                        title: "Select Persons",
                        headerLeft: () => <BackButton/>,
                    }}
                />
                <Stack.Screen
                    name="SelectToolScreen"
                    component={SelectTool}
                    options={{
                        title: "Select Tool",
                        headerLeft: () => <BackButton/>,
                    }}
                />
                <Stack.Screen
                    name="ShareScreen"
                    component={Share}
                    options={{
                        title: "Invite People",
                        headerLeft: () => <BackButton/>,
                    }}
                />
                <Stack.Screen
                    name="JoinScreen"
                    component={Join}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={"CreateSurveyScreen"}
                    component={CreateSurvey}
                    options={{
                        title: "Ask a question",
                        headerLeft: () => <BackButton/>,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
