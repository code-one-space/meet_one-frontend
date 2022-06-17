import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Notes, Start, Confirm, Main, Scan, SelectPerson, SelectTool, Share, Join } from "@@screens";
import { ShareButton, navigationBarStyle, BackButton } from "@@components";
import { navigationRef } from "./shared/navigation/navigation";
import { LogBox } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import AppLoading from "expo-app-loading";
import * as Linking from "expo-linking";
import { useEffect } from "react";
import { Sen_400Regular, Sen_700Bold, useFonts } from "@expo-google-fonts/sen"

const Stack = createNativeStackNavigator();

export default function App() {
    LogBox.ignoreLogs(["Warning: ..."]); // TODO remove this after Review #3
    LogBox.ignoreAllLogs();

    Linking.addEventListener("url", url => {
        if (url) {
            alert("joined open app with link: " + url);
        }
    });

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
        <NavigationContainer ref={navigationRef}> 
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
                        headerRight: () => <ShareButton/>,
                        headerLeft: () => <BackButton/>,
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
            </Stack.Navigator>
        </NavigationContainer>
    );
}
