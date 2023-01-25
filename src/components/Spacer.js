import { View } from "react-native"

export const Spacer = ({ direction, spacing }) => {
  if (direction !== "h" && direction !== "v") {
    return <></>
  }

  const isVertical = direction === "v"
  const style = {
    width: isVertical ? 0 : spacing,
    height: isVertical ? spacing : 0,
  }

  return <View style={style} />
}
