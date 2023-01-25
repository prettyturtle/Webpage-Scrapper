import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useSetRecoilState } from "recoil"
import { SingleLineInput } from "../components/SingleLineInput"
import { Spacer } from "../components/Spacer"
import { Header } from "../header/Header"
import { atomLinkList } from "../states/atomLinkList"
import { getClipboardString } from "../utils/ClipboardUtils"
import { getOpenGraphData } from "../utils/OpenGraphTagUtils"
import { Ionicons } from "@expo/vector-icons"

export const AddLinkScreen = () => {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const updateList = useSetRecoilState(atomLinkList)
  const [url, setUrl] = useState("")
  const [metaData, setMetaData] = useState(null)
  const [loading, setLoading] = useState(false)
  const { width } = useWindowDimensions()
  const dismiss = () => {
    navigation.pop()
  }

  const onPressSave = () => {
    if (url === "") {
      return
    }

    updateList((prevState) => {
      const list = [
        {
          title: metaData.title,
          image: metaData.image,
          link: url,
          createdAt: new Date().toISOString(),
        },
      ]

      return {
        list: list.concat(prevState.list),
      }
    })

    setUrl("")
  }

  const onSubmitEditing = async () => {
    setLoading(true)
    const result = await getOpenGraphData(url)
    setMetaData(result)
    setLoading(false)
  }

  const onGetClipboardString = async () => {
    const result = await getClipboardString()
    if (result.startsWith("http://") || result.startsWith("https://")) {
      setUrl(result)
      const ogResult = await getOpenGraphData(result)
      setMetaData({
        title: ogResult.title,
        image: ogResult.image,
        description: ogResult.description,
      })
    }
    console.log(result)
  }

  useEffect(() => {
    onGetClipboardString()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Header isModal={true}>
        <Header.Group>
          <Header.Button
            onPress={dismiss}
            iconName="close"
          />
          <Spacer
            direction="h"
            spacing={12}
          />
          <Header.Title title="ADD LINK" />
        </Header.Group>
      </Header>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          paddingTop: 32,
          paddingHorizontal: 24,
        }}
      >
        <View>
          <SingleLineInput
            value={url}
            onChangeText={setUrl}
            placeholder="https://example.com"
            onSubmitEditing={onSubmitEditing}
          />
          <TouchableOpacity
            onPress={() => {
              setUrl("")
              setMetaData(null)
            }}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="close"
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
        {loading ? (
          <>
            <Spacer
              direction="v"
              spacing={20}
            />
            <View style={{ borderWidth: 1, borderRadius: 4, borderColor: "grey" }}>
              <Spacer
                direction="v"
                spacing={(width - 50) * 0.5}
              />
              <Spacer
                direction="v"
                spacing={50}
              />
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator />
              </View>
            </View>
          </>
        ) : (
          metaData !== null && (
            <>
              <Spacer
                direction="v"
                spacing={20}
              />
              <View style={{ borderWidth: 1, borderRadius: 4, borderColor: "grey" }}>
                <Image
                  source={{ uri: metaData.image }}
                  style={{
                    width: width - 50,
                    height: (width - 50) * 0.5,
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 4,
                  }}
                />
                <View style={{ paddingHorizontal: 12, paddingVertical: 8 }}>
                  <Spacer
                    direction="v"
                    spacing={10}
                  />
                  <Text style={{ fontSize: 20, color: "black" }}>{metaData.title}</Text>
                  <Spacer
                    direction="v"
                    spacing={4}
                  />
                  <Text style={{ fontSize: 16, color: "grey" }}>{metaData.description}</Text>
                </View>
              </View>
            </>
          )
        )}
      </View>
      <TouchableOpacity
        onPress={onPressSave}
        style={{
          backgroundColor: url === "" ? "grey" : "black",
          paddingBottom: insets.bottom,
        }}
      >
        <View
          style={{
            backgroundColor: url === "" ? "grey" : "black",
            height: 52,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
            }}
          >
            저장하기
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
