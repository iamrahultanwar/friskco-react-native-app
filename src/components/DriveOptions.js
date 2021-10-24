import React from "react";
import {
  Menu,
  Divider,
  HamburgerIcon,
  Box,
  Pressable,
  Icon,
} from "native-base";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function DriveOptions() {
  return (
    <Box h="80%" w="90%" alignItems="flex-end">
      <Menu
        w="190"
        closeOnSelect={false}
        onOpen={() => console.log("opened")}
        onClose={() => console.log("closed")}
        trigger={(triggerProps) => {
          return (
            <Pressable {...triggerProps}>
              <Icon
                size={6}
                as={
                  <MaterialCommunityIcons
                    name="dots-horizontal"
                    color="black"
                  />
                }
              />
            </Pressable>
          );
        }}
      >
        <Menu.Group title="Free">
          <Menu.Item>Arial</Menu.Item>
          <Menu.Item>Nunito Sans</Menu.Item>
          <Menu.Item>Roboto</Menu.Item>
        </Menu.Group>
        <Divider mt="3" w="100%" />
        <Menu.Group title="Paid">
          <Menu.Item>SF Pro</Menu.Item>
          <Menu.Item>Helvetica</Menu.Item>
        </Menu.Group>
      </Menu>
    </Box>
  );
}
