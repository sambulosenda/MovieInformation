import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";
import Colors from "../colors";
import Movies from "../Screens/Movies";
import Search from "../Screens/Search";
import Tv from "../Screens/Tv";
import {Ionicons} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function MyTabs() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? Colors.black : "white",
      }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? Colors.black : "white",
        },
        tabBarActiveTintColor: isDark ? Colors.yellow : Colors.black,
        TabBarInactiveTintColor: isDark ? "#d2dae2" : "#d2dae2",
        headerStyle: {
          backgroundColor: isDark ? Colors.black : "white",
        },
        headerTitleStyle: {
          color: isDark ? Colors.yellow : Colors.black,
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="film" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="TV"
        component={Tv}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="tv" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="search" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
