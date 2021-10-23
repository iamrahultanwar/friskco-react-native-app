import React from "react";
import { HStack, IconButton, Icon, Text, Box, StatusBar } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

export default function Header() {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar backgroundColor="primary.900" barStyle="light-content" />

      <Box safeAreaTop backgroundColor="primary.900" />

      <HStack
        bg="primary.900"
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack space="4" alignItems="center">
          <Text color="white" fontSize="20" pl="4" fontWeight="bold">
            Friskco
          </Text>
        </HStack>
        <HStack space="2">
          <IconButton
            icon={
              <Icon
                as={<MaterialIcons name="search" />}
                color="white"
                size="sm"
              />
            }
            onPress={() => {
              navigation.push("Search");
            }}
          />
        </HStack>
      </HStack>
    </>
  );
}
