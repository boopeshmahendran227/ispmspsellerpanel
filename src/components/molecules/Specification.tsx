import { SpecificationInterface } from "../../types/product";
import SectionHeader from "../atoms/SectionHeader";
import styled from "styled-components";
import CSSConstants from "../../constants/CSSConstants";
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
      <Box>
        {specification.itemGroups.map((group) => (
          <Box>
            <Heading size="lg">{group.name}</Heading>
            {group.items.length > 0 && (
              <Grid m="0.5em 0" templateColumns="200px 1fr">
                {group.items.map((item, itemIndex) => (
                  <Fragment key={itemIndex}>
                    <Box color="secondaryTextColor">{item.key}</Box>
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
