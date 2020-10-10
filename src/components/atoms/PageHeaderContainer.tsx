import { Flex } from "@chakra-ui/core";
interface PageHeaderContainerProps {
  children: React.ReactNode;
}

const PageHeaderContainer = (props: PageHeaderContainerProps) => (
  <Flex px={1} py={2} justify="space-between" align="center" mb={2}>
    {props.children}
  </Flex>
);

export default PageHeaderContainer;
