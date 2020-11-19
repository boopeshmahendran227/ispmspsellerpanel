import { Box } from "@chakra-ui/core";
interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer = (props: PageContainerProps) => (
  <Box mx={[1, null,null, 6, 8]} my={[1, 3]}>
    {props.children}
  </Box>
);

export default PageContainer;
