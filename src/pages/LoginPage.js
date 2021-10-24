import * as React from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Spacer,
  WarningOutlineIcon,
  useToast,
} from "native-base";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GetCurrentUser, LoginUser } from "../services/http";

export default function LoginPage() {
  const navigation = useNavigation();
  const toast = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const loginUser = async () => {
    if (email.length === 0 || password.length === 0) {
      return toast.show({
        title: "Required",
        description: "Email and Password are required",
        status: "error",
      });
    }

    setIsLoading(true);
    try {
      const { data } = await LoginUser(email, password);
      if (data.status) {
        await AsyncStorage.setItem("token", data.token);
        toast.show({
          description: data.message,
        });

        navigation.replace("Main");
      } else {
        setIsLoading(false);

        toast.show({
          status: "error",
          description: data.message,
        });
      }
    } catch (error) {
      setIsLoading(false);

      toast.show({
        title: "Auth Failed",
        status: "error",
        description: error.message,
      });
    }
  };

  React.useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const value = await AsyncStorage.getItem("token");
        if (value !== null) {
          await GetCurrentUser();
          setIsLoading(false);
          navigation.replace("Main");
        } else {
          await AsyncStorage.clear();
          setIsLoading(false);
        }
      } catch (e) {
        await AsyncStorage.clear();
        console.log(e);
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <Box
      safeArea
      flex={1}
      p="2"
      py="8"
      w="90%"
      mx="auto"
      style={{ justifyContent: "center" }}
    >
      <Heading size="lg" fontSize={35} fontWeight="600" color="coolGray.800">
        Login
      </Heading>
      <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
        Sign in to explore awesomeness !
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
            Email
          </FormControl.Label>
          <Input
            value={email}
            onChangeText={(value) => {
              setEmail(value);
            }}
            type="text"
            autoCapitalize="none"
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Try different from previous passwords.
          </FormControl.ErrorMessage>
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
          <Input
            type="password"
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <Link
            _text={{ fontSize: "xs", fontWeight: "500", color: "primary.900" }}
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
            loginUser();
          }}
          _loading={{
            bg: "primary.600",
            _text: {
              color: "white",
            },
          }}
          _spinner={{
            color: "white",
          }}
          isLoading={isLoading}
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
  );
}
