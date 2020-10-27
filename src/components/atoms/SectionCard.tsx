import Card from "./Card";
import {Box} from "@chakra-ui/core";

interface SectionCardProps {
  children: React.ReactNode;
}



const SectionCard = (props: SectionCardProps): JSX.Element => {
  return (
    <Box>
      <Card>{props.children}</Card>
    </Box>
  );
};

export default SectionCard;
