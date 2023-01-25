import { useNavigation } from "@react-navigation/native"
import { Button, FlatList, SectionList, Text, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { NAVIGATION_NAME } from "../constants/NavigationName"
import { Header } from "../header/Header"
import { Ionicons } from "@expo/vector-icons"
import { useRecoilValue } from "recoil"
import { atomLinkList } from "../states/atomLinkList"
import { Spacer } from "../components/Spacer"
import { useMemo } from "react"

export const LinkListScreen = (props) => {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const data = useRecoilValue(atomLinkList)

  const onPressListItem = (item) => {
    navigation.push(NAVIGATION_NAME.LINK_DETAIL, { item })
  }

  const moveToAddLinkScreen = () => {
    navigation.push(NAVIGATION_NAME.ADD_LINK)
  }

  const sectionData = useMemo(() => {
    const dateList = {}

    const makeDateString = (createdAt) => {
      const dateItem = new Date(createdAt)
      return `${dateItem.getFullYear()}.${
        dateItem.getMonth() + 1
      }.${dateItem.getDate()} ${dateItem.getHours()}:${dateItem.getMinutes()}`
    }

    if (!data.list) {
      return []
    }

    data.list
      .filter((item) => item !== null)
      .forEach((item) => {
        const keyName = makeDateString(item.createdAt)

        if (!dateList[keyName]) {
          dateList[keyName] = [item]
        } else {
          dateList[keyName].push(item)
        }
      })

    return Object.keys(dateList).map((item) => {
      return {
        title: item,
        data: dateList[item],
      }
    })
  }, [data.list])

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="LINK LIST" />
      </Header>

      <SectionList
        sections={sectionData}
        style={{ flex: 1 }}
        renderSectionHeader={({ section }) => {
          return (
            <View style={{ paddingHorizontal: 12, paddingVertical: 4, backgroundColor: "white" }}>
              <Text style={{ color: "grey", fontSize: 12 }}>{section.title}</Text>
            </View>
          )
        }}
        renderItem={({ item }) => {
          console.log(item, "🥵")
          if (item === null) {
            return
          }
          return (
            <TouchableOpacity
              onPress={() => onPressListItem(item)}
              style={{ padding: 24 }}
            >
              <View>
                <Text style={{ fontSize: 20 }}>{item.link}</Text>
                <Spacer
                  direction="v"
                  spacing={4}
                />
                <Text style={{ fontSize: 16, color: "grey" }}>
                  {item.title !== "" ? `${item.title.slice(0, 20)} | ` : ""}
                  {new Date(item.createdAt).toLocaleString()}
                </Text>
              </View>
            </TouchableOpacity>
          )
        }}
      />

      {/* <FlatList
        data={data.list}
        renderItem={({ item }) => {
          console.log(item, "🥵")
          if (item === null) {
            return
          }
          return (
            <TouchableOpacity
              onPress={() => onPressListItem(item)}
              style={{ padding: 24 }}
            >
              <View>
                <Text style={{ fontSize: 20 }}>{item.link}</Text>
                <Spacer
                  direction="v"
                  spacing={4}
                />
                <Text style={{ fontSize: 16, color: "grey" }}>
                  {item.title !== "" ? `${item.title.slice(0, 20)} | ` : ""}
                  {new Date(item.createdAt).toLocaleString()}
                </Text>
              </View>
            </TouchableOpacity>
          )
        }}
        style={{ flex: 1 }}
      /> */}

      <TouchableOpacity
        onPress={moveToAddLinkScreen}
        style={{
          backgroundColor: "black",
          position: "absolute",
          width: 52,
          height: 52,
          borderRadius: 26,
          bottom: insets.bottom + 24,
          right: insets.right + 24,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons
          name="add"
          size={32}
          color="white"
        />
      </TouchableOpacity>
    </View>
  )
}
