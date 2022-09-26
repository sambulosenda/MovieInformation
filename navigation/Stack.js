import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ScreenOne = ({navigation: {navigate}}) => (
  <TouchableOpacity onPress={() => navigate('Two')}>
    <Text>ScreenOne</Text>
  </TouchableOpacity>
);
const ScreenTwo = () => (
  <View>
    <Text>ScreenTwo</Text>
  </View>
);
const ScreenThree = () => (
  <View>
    <Text>ScreenThree</Text>
  </View>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator>
    <NativeStack.Screen name="One" component={ScreenOne} />
    <NativeStack.Screen name="Two" component={ScreenTwo} />
    <NativeStack.Screen name="Three" component={ScreenThree} />
  </NativeStack.Navigator>
);

export default Stack;
