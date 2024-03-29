import { Box } from "@chakra-ui/core";

interface PageBodyContainerProps {
  children: React.ReactNode;
}

const PageBodyContainer = (props: PageBodyContainerProps) => (
  <Box
    pb={1}
    bg="foregroundColor.500"
    boxShadow="md"
  >
    {props.children}
  </Box>
);

export default PageBodyContainer;
