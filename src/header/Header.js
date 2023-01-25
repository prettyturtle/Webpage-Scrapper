import { Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Spacer } from "../components/Spacer"
import { HeaderButton } from "./HeaderButton"
import { HeaderGroup } from "./HeaderGroup"
import { HeaderTitle } from "./HeaderTitle"

export const Header = (props) => {
  const insets = useSafeAreaInsets()
  const backgroundColor = "white"
  const { isModal } = props

  return (
    <View
      style={{
        paddingTop: isModal ? 0 : insets.top,
        backgroundColor: backgroundColor,
      }}
    >
      <View
        style={{
          backgroundColor: backgroundColor,
          height: 56,
          borderBottomColor: "lightgrey",
          borderBottomWidth: "0.4",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Spacer
          direction="h"
          spacing={16}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {props.children}
        </View>
        <Spacer
          direction="h"
          spacing={16}
        />
      </View>
    </View>
  )
}

Header.Title = HeaderTitle
Header.Button = HeaderButton
Header.Group = HeaderGroup
