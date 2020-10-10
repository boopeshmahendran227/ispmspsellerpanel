import { Box } from "@chakra-ui/core";
interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer = (props: PageContainerProps) => (
  <Box mx={5} my={10}>
    {props.children}
  </Box>
);

export default PageContainer;
