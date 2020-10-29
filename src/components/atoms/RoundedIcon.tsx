import React from "react";
import { Box } from "@chakra-ui/core";

interface RoundedIconProps {
  icon: React.ReactNode;
  color: string;
  size?: string;
}

const RoundedIcon = (props: RoundedIconProps): JSX.Element => {
  const { icon, color, size } = props;

  return (
    <Box
      fontSize={["sm", null, null, "xl"]}
      p={2}
      width={size}
      height={size}
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

RoundedIcon.defaultProps = {
  size: ["40px", null, "50px", "70px"],
};

export default RoundedIcon;
