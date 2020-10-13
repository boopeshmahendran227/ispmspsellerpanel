import styled from "styled-components";
import Chroma from "chroma-js";
import React from "react";
import { Box } from "@chakra-ui/core";

interface IconContainerProps {
  color: string;
}

// const Box = styled.div<IconContainerProps>`
//   font-size: 1.7rem;
//   padding: 0.7em;
//   width: 70px;
//   height: 70px;
//   position: relative;
//   background: ${(props) => Chroma(props.color).alpha(0.2)};
//   border-radius: 50%;
//   color: ${(props) => props.color};
// `;

// const Icon = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// `;

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
      bg={`${props.color}.100`}
      color={`${props.color}.500`}
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
