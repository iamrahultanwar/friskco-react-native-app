import React from "react";
import { Text, Icon, HStack, Center, Pressable } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Footer({ state, descriptors, navigation, icons }) {
  return (
    <HStack bg="primary.900" alignItems="center" safeAreaBottom shadow={6}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            opacity={isFocused ? 1 : 0.5}
            py="3"
            flex={1}
            onPress={onPress}
            key={index}
          >
            <Center>
              <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name={
                      isFocused
                        ? icons[label.toLowerCase()][0]
                        : icons[label.toLowerCase()][1]
                    }
                  />
                }
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                {label}
              </Text>
            </Center>
          </Pressable>
        );
      })}
    </HStack>
  );
}
