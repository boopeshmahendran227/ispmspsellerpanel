import { Box } from "@chakra-ui/core";

interface CardProps {
  children: React.ReactNode;
}

const Card = (props: CardProps): JSX.Element => {
  return (
    <Box
      bg="foregroundColor.500"
      border="1px"
      borderColor="borderColor.500"
      py={3}
      px={[2, 3]}
    >
      {props.children}
    </Box>
  );
};

export default Card;
