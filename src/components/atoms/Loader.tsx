import { Flex, Spinner } from "@chakra-ui/core";
import * as React from "react";
import CSSConstants from "../../constants/CSSConstants";
interface LoaderProps {
  width: string;
  height: string;
  loaderWidth?: string;
  size: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
}

const Loader = (props: LoaderProps) => {
  return (
    <Flex justify="center" align="center" w={props.width} h={props.height}>
      <Spinner
        size={props.size}
        thickness={props.loaderWidth}
        color={CSSConstants.primaryColor}
      />
    </Flex>
  );
};

Loader.defaultProps = {
  size: "xl",
  loaderWidth: "4px",
  width: "100%",
  height: "200px",
};

export default Loader;
