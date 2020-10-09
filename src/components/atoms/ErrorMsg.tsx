import * as React from "react";
import { Flex, Box } from "@chakra-ui/core";

interface ErrorMsgProps {
  text?: string;
}

const ErrorMsg = (props: ErrorMsgProps) => {
  return (
    <Flex direction="column" justify="center" alignItems="center" minH="200px">
      <Box as="span">{props.text}</Box>
    </Flex>
  );
};

ErrorMsg.defaultProps = {
  text: "Something is not right. Please try again",
};

export default ErrorMsg;
