import { TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export const HeaderButton = ({ iconName, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons
        name={iconName}
        size={24}
        color="black"
      />
    </TouchableOpacity>
  )
}
