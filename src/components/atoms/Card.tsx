import { Box } from "@chakra-ui/core";

interface CardProps {
  children: React.ReactNode;
}

const Card = (props: CardProps): JSX.Element => {
  return (
    <Box bg="foregroundColor" border="1px" borderColor="borderColor" py={3} px={5}>
      {props.children}
    </Box>
  );
};

export default Card;
