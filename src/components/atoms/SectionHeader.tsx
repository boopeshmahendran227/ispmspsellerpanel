
import { Box } from "@chakra-ui/core";

interface SectionHeaderInterface {
  children: React.ReactNode;
}
const SectionHeader = (props: SectionHeaderInterface) => (
  <Box fontWeight="bold" fontSize="1.3rem" mb="1em">
    {props.children}
  </Box>
);
export default SectionHeader;
