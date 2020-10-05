import { Flex } from "@chakra-ui/core";
interface PageHeaderContainerProps {
  children: React.ReactNode;
}

const PageHeaderContainer = (props: PageHeaderContainerProps) => (
  <Flex px="0.3em" py="0.2em" justify="space-between" align="center">
    {props.children}
  </Flex>
);

export default PageHeaderContainer;
