import React from "react";
import { Heading, Box } from "native-base";

const PageHeader = ({ title }) => {
  return <Heading fontSize={20}>{title}</Heading>;
};

export default PageHeader;
