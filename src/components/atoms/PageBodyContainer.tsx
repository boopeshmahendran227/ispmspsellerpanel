import { Box } from "@chakra-ui/core";

interface PageBodyContainerProps {
  children: React.ReactNode;
}

const PageBodyContainer = (props: PageBodyContainerProps) => (
  <Box
    pb="0.5em"
    bg="foregroundColor"
    boxShadow="0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)"
  >
    {props.children}
  </Box>
);

export default PageBodyContainer;
