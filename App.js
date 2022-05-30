import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Notes, Start, Confirm, Main, Scan, SelectPerson, SelectTool, Share, SixHats } from "@@screens";
import { ShareButton, navigationBarStyle, BackButton } from "@@components";
import { navigationRef } from "./shared/navigation/navigation";
import * as HardwareBackButtonHandler from "./shared/backButtonHandler/backButtonHandler";
import {BackHandler, LogBox} from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
    // LogBox.ignoreLogs(["Warning: ..."]); // TODO remove this after Review #3
    // LogBox.ignoreAllLogs();

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
                  options={{ headerLeft: () => <BackButton/> }}
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
          </Stack.Navigator>
      </NavigationContainer>
  );
}
