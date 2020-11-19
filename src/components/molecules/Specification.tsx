import { SpecificationInterface } from "../../types/product";
import SectionHeader from "../atoms/SectionHeader";
import { Fragment } from "react";
import SectionCard from "../atoms/SectionCard";
import SectionHeaderContainer from "../atoms/SectionHeaderContainer";
import { Box, Grid, Heading } from "@chakra-ui/core";

interface SpecificationProps {
  specification: SpecificationInterface;
}

const Specification = (props: SpecificationProps) => {
  const { specification } = props;

  return (
    <SectionCard>
      <SectionHeaderContainer>
        <SectionHeader>Specification</SectionHeader>
      </SectionHeaderContainer>
      <Box fontSize={["sm", "md"]}>
        {specification.itemGroups.map((group) => (
          <Box>
            <Heading size="sm">{group.name}</Heading>
            {group.items.length > 0 && (
              <Grid my={2} templateColumns={["150px 1fr", "200px 1fr"]}>
                {group.items.map((item, itemIndex) => (
                  <Fragment key={itemIndex}>
                    <Box color="secondaryTextColor.500">{item.key}</Box>
                    <Box>{item.value}</Box>
                  </Fragment>
                ))}
              </Grid>
            )}
          </Box>
        ))}
      </Box>
    </SectionCard>
  );
};

export default Specification;
