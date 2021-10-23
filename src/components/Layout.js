import React from "react";
import { Box, VStack } from "native-base";
export default function Layout({ children }) {
  return (
    <Box p="3">
      <VStack>{children}</VStack>
    </Box>
  );
}
