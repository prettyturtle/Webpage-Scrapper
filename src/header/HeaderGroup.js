import { View } from "react-native"

export const HeaderGroup = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.children}
    </View>
  )
}
