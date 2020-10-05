import CSSConstants from "../../constants/CSSConstants";
import { Box } from "@chakra-ui/core";

interface CardProps {
  children: React.ReactNode;
}

const Card = (props: CardProps): JSX.Element => {
  return (
    <Box
      bg={CSSConstants.foregroundColor}
      border={CSSConstants.borderStyle}
      p="1em"
    >
      {props.children}
    </Box>
  );
};

export default Card;
