import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NAVIGATION_NAME } from "../constants/NavigationName"
import { AddLinkScreen } from "../screens/AddLinkScreen"
import { LinkStackNavigation } from "./LinkStackNavigation"

const ROOT_NAVIGATION_NAME = NAVIGATION_NAME.LINK_STACK

export const RootNavigation = () => {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator
      initialRouteName={ROOT_NAVIGATION_NAME}
      screenOptions={{
        presentation: "modal",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={NAVIGATION_NAME.LINK_STACK}
        component={LinkStackNavigation}
      />
      <Stack.Screen
        name={NAVIGATION_NAME.ADD_LINK}
        component={AddLinkScreen}
      />
    </Stack.Navigator>
  )
}
