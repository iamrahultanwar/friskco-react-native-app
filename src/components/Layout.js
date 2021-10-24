import React from "react";
import { Box } from "native-base";
export default function Layout({ children }) {
  return (
    <Box p="3" height="100%" bg="white">
      {children}
    </Box>
  );
}
