import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components/native";
import Root from "./navigation/Root";
import { darkTheme, lightTheme } from "./styled";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";


// Create a client
const queryClient = new QueryClient()


export default function App() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
