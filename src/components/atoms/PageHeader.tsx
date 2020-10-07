import { Heading } from "@chakra-ui/core";
interface PageHeaderProps {
  children: React.ReactNode;
}

const PageHeader = (props: PageHeaderProps) => {
  return (
    <Heading m="0.5em 0" size="md">
      {props.children}{" "}
    </Heading>
  );
};

export default PageHeader;
