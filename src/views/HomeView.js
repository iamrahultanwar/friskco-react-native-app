import React, { useState, useEffect } from "react";

import {
  Box,
  Text,
  Pressable,
  Heading,
  Icon,
  HStack,
  Avatar,
  VStack,
  Spacer,
  FlatList,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import PageHeader from "../components/PageHeader";
import Layout from "../components/Layout";
import { GetUserDrives } from "../services/http";
import { format } from "date-fns";
import DriveOptions from "../components/DriveOptions";
import { useNavigation } from "@react-navigation/core";

export default function HomeView() {
  return (
    <Layout>
      <Basic />
    </Layout>
  );
}

function Basic() {
  const navigation = useNavigation();

  const [listData, setListData] = useState([]);

  useEffect(() => {
    const getAllUserDrives = async () => {
      try {
        const { data } = await GetUserDrives();
        setListData(data);
      } catch {}
    };

    getAllUserDrives();
  }, []);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = ({ item, index }) => {
    const date = new Date(item.CreatedAt);
    const formattedDate = format(date, "MMMM do, yyyy");
    return (
      <Box key={index}>
        <Pressable
          onPress={() =>
            navigation.push("DriveData", {
              driveId: item.ID,
              driveName: item.name,
            })
          }
          bg="white"
        >
          <Box py="2">
            <HStack
              alignItems="center"
              justifyContent="space-between"
              space={2}
            >
              <VStack>
                <Text
                  color="coolGray.800"
                  _dark={{ color: "warmGray.50" }}
                  bold
                  fontSize={20}
                >
                  {item.name}
                </Text>
                <Spacer />
                <Text color="coolGray.600" _dark={{ color: "warmGray.200" }}>
                  {formattedDate}
                </Text>
              </VStack>
              <Box flex={1} flexDirection="row" justifyContent="flex-end">
                <DriveOptions />
              </Box>
            </HStack>
          </Box>
        </Pressable>
      </Box>
    );
  };

  return (
    <Box flex="1">
      <FlatList
        keyExtractor={(item) => item.ID}
        data={listData}
        renderItem={renderItem}
        onRowDidOpen={onRowDidOpen}
      />
    </Box>
  );
}
