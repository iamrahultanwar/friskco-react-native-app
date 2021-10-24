import { useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { GetUserDriveFiles } from "../../services/http";
import {
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  Center,
  NativeBaseProvider,
  IconButton,
  Icon,
  Pressable,
} from "native-base";
import { format } from "date-fns";

import { AntDesign } from "@expo/vector-icons";

import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DriveDataView() {
  const route = useRoute();

  const [files, setFiles] = useState([]);
  const [fileDownloadProgress, setFileDownloadProgress] = useState(0);

  const callback = (downloadProgress) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setFileDownloadProgress(progress);
    console.log(progress);
  };

  const downloadResumable = async (url, name) => {
    const token = await AsyncStorage.getItem("token");
    return FileSystem.createDownloadResumable(
      url,
      FileSystem.documentDirectory + name,
      {
        headers: {
          token,
        },
      },
      callback
    );
  };

  const downloadFile = async (url, name) => {
    try {
      const fs = await downloadResumable(url, name);
      const { uri } = fs.downloadAsync();
      console.log("Finished downloading to ", uri);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const getUserDriveFiles = async () => {
      try {
        const { data } = await GetUserDriveFiles(route.params.driveId);
        setFiles(data);
      } catch (error) {}
    };
    if (route.params.driveId) {
      getUserDriveFiles();
    }
  }, [route]);

  return (
    <Box
      w={{
        base: "100%",
        md: "25%",
      }}
    >
      <HStack
        justifyContent="space-between"
        alignItems="center"
        alignContent="center"
        p="3"
      >
        <Heading fontSize="xl" color="blueGray.600">
          Files
        </Heading>
        <IconButton
          onPress={async () => {
            const data = await DocumentPicker.getDocumentAsync({
              type: "*/*",
              copyToCacheDirectory: true,
            });
            console.log(data);
          }}
          icon={
            <Icon size={6} as={<AntDesign name="addfile" color="black" />} />
          }
        />
      </HStack>
      <FlatList
        data={files}
        height={"100%"}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "gray.600",
            }}
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="2"
          >
            <Pressable
              onPress={() => {
                downloadFile(
                  "http://localhost:8080/api/file/get/" + item.path,
                  item.name
                );
              }}
            >
              <HStack space={3} justifyContent="space-between">
                <VStack>
                  <Text
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    bold
                    noOfLines={2}
                    isTruncated
                    width={250}
                  >
                    {item.name}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                    isTruncated
                    width={250}
                  >
                    {item.path}
                  </Text>
                </VStack>
                <Spacer />
                <Text
                  fontSize="xs"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  alignSelf="flex-start"
                >
                  {fDate(item)}
                </Text>
              </HStack>
            </Pressable>
          </Box>
        )}
        keyExtractor={(item) => item.ID}
      />
    </Box>
  );
}

const fDate = (item) => {
  const date = new Date(item.CreatedAt);
  const formattedDate = format(date, "d MMM,yyyy");
  return formattedDate;
};
