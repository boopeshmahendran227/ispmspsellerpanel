import { Box } from "@chakra-ui/core";
interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer = (props: PageContainerProps) => (
  <Box mx="0.5em" my="2em">
    {props.children}
  </Box>
);

export default PageContainer;
