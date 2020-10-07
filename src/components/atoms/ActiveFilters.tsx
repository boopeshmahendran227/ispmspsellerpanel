import CSSConstants from "../../constants/CSSConstants";
import { Flex, Box, Button, Heading } from "@chakra-ui/core";

interface ActiveFiltersProps {
  appliedFilters: string[];
  clearFilters: () => void;
}

const ActiveFilters = (props: ActiveFiltersProps) => {
  const { appliedFilters } = props;

  if (appliedFilters.length <= 0) {
    return null;
  }

  return (
    <Flex align="center" p="0.2em">
      <Heading size="md">Active Filters:</Heading>
      {appliedFilters.map((filter) => (
        <Box m="0.6em" fontWeight="bold">
          {filter}
        </Box>
      ))}
      <Button
        variant="link"
        fontWeight="bold"
        color={CSSConstants.secondaryColor}
        onClick={props.clearFilters}
      >
        Clear all
      </Button>
    </Flex>
  );
};

export default ActiveFilters;
