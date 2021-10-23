import React from "react";
import { VStack, Input, Icon, Box, Divider, StatusBar } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

export default function SearchView() {
  return (
    <>
      <VStack
        space={5}
        width="100%"
        divider={
          <Box px="2">
            <Divider />
          </Box>
        }
      >
        <VStack width="100%" space={5} alignItems="center" p="3">
          <Input
            placeholder="Search People & Places"
            bg="#fff"
            width="100%"
            borderRadius="4"
            py="3"
            px="1"
            fontSize="14"
            _web={{
              _focus: {
                borderColor: "muted.300",
                style: { boxShadow: "none" },
              },
            }}
            InputLeftElement={
              <Icon
                m="2"
                ml="3"
                size="6"
                color="gray.400"
                as={<MaterialIcons name="search" />}
              />
            }
            InputRightElement={
              <Icon
                m="2"
                mr="3"
                size="6"
                color="gray.400"
                as={<MaterialIcons name="mic" />}
              />
            }
          />
        </VStack>
      </VStack>
    </>
  );
}
