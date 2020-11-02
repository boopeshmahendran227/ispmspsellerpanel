import { Flex } from "@chakra-ui/core";
interface PageHeaderContainerProps {
  children: React.ReactNode;
}

const PageHeaderContainer = (props: PageHeaderContainerProps) => (
  <Flex
    p={1}
    justify="space-between"
    align={["flex-start", "center"]}
    direction={["column", "row"]}
  >
    {props.children}
  </Flex>
);

export default PageHeaderContainer;
