import { useNavigation } from "@react-navigation/native"
import { View } from "react-native"
import WebView from "react-native-webview"
import { Spacer } from "../components/Spacer"
import { Header } from "../header/Header"

export const LinkDetailScreen = (props) => {
  const navigation = useNavigation()

  const dismiss = () => {
    navigation.pop()
  }

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Button
            onPress={dismiss}
            iconName="arrow-back"
          />
          <Spacer
            direction="h"
            spacing={12}
          />
          <Header.Title title="LINK DETAIL" />
        </Header.Group>
      </Header>
      <WebView
        style={{ flex: 1 }}
        source={{ uri: props.route.params.item.link }}
      />
    </View>
  )
}
