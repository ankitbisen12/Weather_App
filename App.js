import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as Progress from "react-native-progress";
import tw from "twrnc";
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import { SearchContext, SearchProvider } from "./context/SearchContext";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function WeatherOverview() {
  const { setSearchShow } = useContext(SearchContext);

  return (
    <Drawer.Navigator
      screenOptions={({ route, navigation }) => ({
        headerStyle: {
          backgroundColor: "#093039", // Makes the background transparent
          elevation: 0, // Remove shadow for Android
          shadowOpacity: 0, // Remove shadow for iOS
          shadowRadius: 0, // Optional: Remove shadow radius on iOS
        },
        headerTintColor: "white",
        headerTitleAlign: "center",
        drawerActiveBackgroundColor: "#244843",
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "gray",
        headerTitle: () => (
          <Text
            style={{
              fontSize: 30,
              marginBottom: "10",
              color: "#d5ebf7",
              fontFamily: "YujiMai-Regular", // Custom font
            }}
          >
            WeaT͟HəR
          </Text>
        ),
        headerLeft: ({ tintColor }) => {
          return (
            <Ionicons
              name="menu"
              size={34}
              color={tintColor || "color"}
              style={{ marginLeft: 15, alignItems: "center" }}
              onPress={() => navigation.toggleDrawer()}
            />
          );
        },
        headerRight: ({ tintColor }) => {
          return (
            <FontAwesome
              name="search"
              size={24}
              color={tintColor || "color"}
              style={{ marginRight: 20, alignItems: "center" }}
              onPress={() => setSearchShow((prevstate) => !prevstate)}
            />
          );
        },
      })}
    >
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{
          title: "About",
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [searchShow, setSearchShow] = useState(false);
  const [fontsLoaded] = useFonts({
    "YujiMai-Regular": require("./assets/fonts/YujiMai-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={tw`flex-1 flex-row justify-center items-center`}>
        <Progress.CircleSnail thickness={10} size={140} color="white" />
      </View>
    );
  }

  return (
    <SearchProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="WeatherOverview"
              component={WeatherOverview}
              options={{
                headerShown: false,
              }}
              initialParams={{
                searchShow,
                setSearchShow,
              }}
            />
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }}
              initialParams={{
                searchShow,
                setSearchShow,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SearchProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "c", // Set the background color here
  },
});
