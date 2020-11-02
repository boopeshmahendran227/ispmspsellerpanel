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
    <Flex align="center" p={1} fontSize={["xs", "md"]}>
      <Box>Active Filters:</Box>
      {appliedFilters.map((filter) => (
        <Box m={2} fontWeight="bold">
          {filter}
        </Box>
      ))}
      <Button
        variant="link"
        fontWeight="bold"
        variantColor="secondaryColorVariant"
        onClick={props.clearFilters}
      >
        Clear all
      </Button>
    </Flex>
  );
};

export default ActiveFilters;
