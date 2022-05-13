import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllNotesScreen from './screens/allNotes/allNotesScreen';
import StartScreen from "./screens/start/startScreen";
import ConfirmScreen from "./screens/confirm/confirmScreen";
import MainScreen from "./screens/main/mainScreen";
import ScanScreen from "./screens/scan/scanScreen";
import SelectPersonScreen from "./screens/selectPerson/selectPersonScreen";
import SelectToolScreen from "./screens/selectTool/selectToolScreen";
import ShareScreen from "./screens/share/shareScreen";
import SixHatsScreen from "./screens/sixHats/sixHatsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen
                  name="StartScreen"
                  component={StartScreen}
              />
              <Stack.Screen
                  name="AllNotesScreen"
                  component={AllNotesScreen}
              />
              <Stack.Screen
                  name="ConfirmScreen"
                  component={ConfirmScreen}
              />
              <Stack.Screen
                  name="MainScreen"
                  component={MainScreen}
                  options={{ title: "Team" }}
              />
              <Stack.Screen
                  name="ScanScreen"
                  component={ScanScreen}
                  options={{ title: "Scan QR-Code" }}
              />
              <Stack.Screen
                  name="SelectPersonScreen"
                  component={SelectPersonScreen}
                  options={{ title: "6 Hats" }}
              />
              <Stack.Screen
                  name="SelectToolScreen"
                  component={SelectToolScreen}
                  options={{ title: "Select Tool" }}
              />
              <Stack.Screen
                  name="ShareScreen"
                  component={ShareScreen}
                  options={{ title: "Invite People" }}
              />
              <Stack.Screen
                  name="SixHatsScreen"
                  component={SixHatsScreen}
                  options={{ title: "6 Hats" }}
              />
          </Stack.Navigator>
      </NavigationContainer>
  );
}
