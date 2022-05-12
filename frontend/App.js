import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import StartScreen from "./screens/startScreen/index.js";
import Button from './components/button/index'
import {Text} from "react-native-web";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{ title: 'Welcome' }}
              />
              <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}

const HomeScreen = ({ navigation }) => {
    return (
        <Button
            title="Go to Jane's profile"
            onPress={() =>
                navigation.navigate('Profile', { name: 'Jane' })
            }
        />
    );
};
const ProfileScreen = ({ navigation, route }) => {
    return <Text>This is {route.params.name}'s profile</Text>;
};
