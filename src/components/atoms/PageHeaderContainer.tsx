import { Flex } from "@chakra-ui/core";
interface PageHeaderContainerProps {
  children: React.ReactNode;
}

const PageHeaderContainer = (props: PageHeaderContainerProps) => (
  <Flex
    px={1}
    py={2}
    justify="space-between"
    align={["flex-start", "center"]}
    mb={2}
    direction={["column", "row"]}
  >
    {props.children}
  </Flex>
);

export default PageHeaderContainer;
