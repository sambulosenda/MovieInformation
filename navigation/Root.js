import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Stack from "./Stack";
import MyTabs from "./Tabs";

const Nav = createNativeStackNavigator();

const Root = () => (
  <Nav.Navigator screenOptions={{headerShown: false, presentation: "modal"}}>
    <Nav.Screen name="Tabs" component={MyTabs} />
    <Nav.Screen name="Stack" component={Stack} />
  </Nav.Navigator>
)
export default Root;
