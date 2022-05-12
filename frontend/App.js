import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AllNotesScreen from './screens/allNotes/AllNotesScreen';
import StartScreen from "./screens/start/StartScreen";
import ConfirmScreen from "./screens/confirm/ConfirmScreen";
import MainScreen from "./screens/main/MainScreen";
import ScanScreen from "./screens/scan/ScanScreen";
import SelectPersonScreen from "./screens/selectPerson/SelectPersonScreen";
import SelectToolScreen from "./screens/selectTool/SelectToolScreen";
import ShareScreen from "./screens/share/ShareScreen";
import SixHatsScreen from "./screens/sixHats/SixHatsScreen";

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
