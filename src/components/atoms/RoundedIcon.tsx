import React from "react";
import { Box } from "@chakra-ui/core";

interface RoundedIconProps {
  icon: React.ReactNode;
  color: string;
}

const RoundedIcon = (props: RoundedIconProps): JSX.Element => {
  const { icon, color } = props;

  return (
    <Box
      fontSize={["sm","xl"]}
      p={2}
      width={["40px", "70px"]}
      height={["40px", "70px"]}
      position="relative"
      borderRadius="50%"
      bg={`${color}.100`}
      color={`${color}.500`}
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        {icon}
      </Box>
    </Box>
  );
};

export default RoundedIcon;
