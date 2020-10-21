import { Grid } from "@chakra-ui/core";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = (props: PageLayoutProps) => (
  <Grid gridRowGap={3} w="100%;" maxW=" 1170px" m="auto">
    {props.children}
  </Grid>
);

export default PageLayout;
