import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../src/screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import TodoHome from "../src/screens/TodoScreens/TodoHome";
import CategoryTodo from "../src/screens/TodoScreens/CategoryTodo";
import SubCategoryTodo from "../src/screens/TodoScreens/SubCategoryTodo";

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          options={{ headerMode: "none" }}
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerMode: "none" }}
          name="TodoHome"
          component={TodoHome}
        />
        <Stack.Screen
          options={{ headerMode: "none" }}
          name="CategoryTodo"
          component={CategoryTodo}
        />
        <Stack.Screen
          options={{ headerMode: "none" }}
          name="SubCategoryTodo"
          component={SubCategoryTodo}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
