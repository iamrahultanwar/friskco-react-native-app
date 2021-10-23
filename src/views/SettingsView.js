import React from "react";
import {
  Box,
  Heading,
  HStack,
  VStack,
  Text,
  Switch,
  Button,
  Icon,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import PageHeader from "../components/PageHeader";
import Layout from "../components/Layout";
import { GetCurrentUser } from "../services/http";

const SettingsView = () => {
  const navigation = useNavigation();
  React.useEffect(() => {
    const getUserDetail = async () => {
      try {
        const { data } = await GetCurrentUser();
        console.log(data);
      } catch (error) {
        console.log(error);
        navigation.replace("Login");
      }
    };
    getUserDetail();
  }, []);
  return (
    <Layout>
      <PageHeader title={"Settings"} />
      <HStack p="3" justifyContent="space-between">
        <Text>Private</Text>
        <Switch size="sm" />
      </HStack>

      <Button
        leftIcon={<Icon as={MaterialCommunityIcons} name="logout" size="sm" />}
        bg="primary.700"
        onPress={async () => {
          await AsyncStorage.clear();
          navigation.replace("Login");
        }}
      >
        Logout
      </Button>
    </Layout>
  );
};

export default SettingsView;
