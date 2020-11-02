import { Heading } from "@chakra-ui/core";
interface PageHeaderProps {
  children: React.ReactNode;
}

const PageHeader = (props: PageHeaderProps) => {
  return (
    <Heading my={[2, 3, 5]} size="md">
      {props.children}{" "}
    </Heading>
  );
};

export default PageHeader;
