import { Heading } from "@chakra-ui/core";
interface PageHeaderProps {
  children: React.ReactNode;
}

const PageHeader = (props: PageHeaderProps) => {
  return (
    <Heading my={5} size="lg">
      {props.children}{" "}
    </Heading>
  );
};

export default PageHeader;
