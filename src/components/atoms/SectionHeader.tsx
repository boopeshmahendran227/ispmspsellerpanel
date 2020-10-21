
import { Box } from "@chakra-ui/core";

interface SectionHeaderInterface {
  children: React.ReactNode;
}
const SectionHeader = (props: SectionHeaderInterface) => (
  <Box fontWeight="bold" fontSize="lg" mb={1}>
    {props.children}
  </Box>
);
export default SectionHeader;
