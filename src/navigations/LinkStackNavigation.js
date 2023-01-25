import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NAVIGATION_NAME } from "../constants/NavigationName"
import { LinkDetailScreen } from "../screens/LinkDetailScreen"
import { LinkListScreen } from "../screens/LinkListScreen"

const ROOT_NAVIGATION_NAME = NAVIGATION_NAME.LINK_LIST

export const LinkStackNavigation = () => {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator
      initialRouteName={ROOT_NAVIGATION_NAME}
      screenOptions={{
        presentation: "card",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={NAVIGATION_NAME.LINK_LIST}
        component={LinkListScreen}
      />
      <Stack.Screen
        name={NAVIGATION_NAME.LINK_DETAIL}
        component={LinkDetailScreen}
      />
    </Stack.Navigator>
  )
}
