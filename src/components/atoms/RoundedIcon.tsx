import styled from "styled-components";
import Chroma from "chroma-js";
import React from "react";

interface IconContainerProps {
  color: string;
}

const IconContainer = styled.div<IconContainerProps>`
  font-size: 1.7rem;
  padding: 0.7em;
  width: 70px;
  height: 70px;
  position: relative;
  background: ${(props) => Chroma(props.color).alpha(0.2)};
  border-radius: 50%;
  color: ${(props) => props.color};
`;

const Icon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface RoundedIconProps {
  icon: React.ReactNode;
  color: string;
}

const RoundedIcon = (props: RoundedIconProps): JSX.Element => {
  const { icon, color } = props;

  return (
    <IconContainer color={color}>
      <Icon>{icon}</Icon>
    </IconContainer>
  );
};

export default RoundedIcon;
