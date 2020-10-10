
import { Box } from "@chakra-ui/core";

interface SectionHeaderInterface {
  children: React.ReactNode;
}
const SectionHeader = (props: SectionHeaderInterface) => (
  <Box fontWeight="bold" fontSize="xl" mb={1}>
    {props.children}
  </Box>
);
export default SectionHeader;
