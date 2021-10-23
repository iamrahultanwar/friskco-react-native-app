import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Icon,
  IconButton,
  Link,
  HStack,
  Text,
} from "native-base";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterPage() {
  const navigation = useNavigation();
  return (
    <Box safeArea flex={1}>
      <IconButton
        icon={
          <Icon
            as={
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color="black"
              />
            }
            name="back-arrow"
          />
        }
        onPress={() => {
          navigation.pop();
        }}
      />
      <Box
        flex={1}
        style={{ justifyContent: "center" }}
        p="2"
        w="90%"
        mx="auto"
      >
        <Heading fontSize={35} size="lg" fontWeight="600" color="coolGray.800">
          Register
        </Heading>
        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
          Join us to explore awesomeness !
        </Heading>
        <Box my="5" />
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label
              _text={{
                color: "coolGray.800",
                fontSize: "xs",
                fontWeight: 500,
              }}
            >
              Email ID
            </FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{
                color: "coolGray.800",
                fontSize: "xs",
                fontWeight: 500,
              }}
            >
              Password
            </FormControl.Label>
            <Input type="password" />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{
                color: "coolGray.800",
                fontSize: "xs",
                fontWeight: 500,
              }}
            >
              Confirm Password
            </FormControl.Label>
            <Input type="password" />
            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "primary.900",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forget Password?
            </Link>
          </FormControl>
          <Button
            mt="2"
            colorScheme="primary"
            _text={{ color: "white" }}
            onPress={() => {
              navigation.replace("Main");
            }}
          >
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="muted.700" fontWeight={400}>
              I'm a new user.{" "}
            </Text>
            <Link
              _text={{
                color: "primary.900",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={() => {
                navigation.push("Register");
              }}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}
