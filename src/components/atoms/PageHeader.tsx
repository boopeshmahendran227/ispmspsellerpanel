import { Heading } from "@chakra-ui/core";
interface PageHeaderProps {
  children: React.ReactNode;
}

const PageHeader = (props: PageHeaderProps) => {
  return (
    <Heading mx="0.5em" my="0">
      {props.children}{" "}
    </Heading>
  );
};

export default PageHeader;
