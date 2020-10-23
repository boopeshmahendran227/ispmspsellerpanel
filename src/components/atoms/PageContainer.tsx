import { Box } from "@chakra-ui/core";
interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer = (props: PageContainerProps) => (
  <Box mx={[1, 5]} my={[2, 4]}>
    {props.children}
  </Box>
);

export default PageContainer;
