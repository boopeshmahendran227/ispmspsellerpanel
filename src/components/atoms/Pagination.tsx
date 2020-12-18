import _ from "lodash";
import { PaginationDataInterface } from "../../types/pagination";
import { Box, Button } from "@chakra-ui/core";

interface PaginationProps {
  data: PaginationDataInterface;
  onChange: (value: number) => void;
}

const Pagination = (props: PaginationProps) => {
  const value = props.data.currentPageNumber;
  const totalNumberOfPages = props.data.totalPages;

  const low = Math.max(value - 4, 1);
  const high = Math.min(totalNumberOfPages, low + 9);

  const handleClick = (value) => {
    props.onChange(value);
  };

  const goToNext = () => {
    props.onChange(value + 1);
  };

  const goToPrev = () => {
    props.onChange(value - 1);
  };

  const pages = _.range(low, high + 1).map((i) => (
    <Box display="inline-block" mx={1} key={i}>
      <Button
        _focus={{ boxShadow: "none" }}
        bg={value === i ? "primaryColorVariant.500" : "rgba(0,0,0,0)"}
        _hover={{
          bg: value === i ? "primaryColorVariant.800" : "rgba(0,0,0,0)",
        }}
        color={value === i ? "white" : ""}
        type="button"
        size="xs"
        transition="all 0.3s"
        onClick={() => handleClick(i)}
      >
        {i}
      </Button>
    </Box>
  ));

  return (
    <Box w="100%" textAlign="center" my={3}>
      <Button
        _focus={{ boxShadow: "none" }}
        _hover={{ borderColor: "primaryColorVariant.500" }}
        variant="outline"
        type="button"
        fontWeight="500"
        display={value <= 1 ? "none" : "inline-block"}
        onClick={goToPrev}
      >
        <i className="fas fa-chevron-left"></i> Previous
      </Button>
      <Box display="inline-block">{pages}</Box>
      <Button
        _hover={{ borderColor: "primaryColorVariant.500" }}
        _focus={{ boxShadow: "none" }}
        variant="outline"
        type="button"
        fontWeight="500"
        display={value >= totalNumberOfPages ? "none" : "inline-block"}
        onClick={goToNext}
      >
        Next <i className="fas fa-chevron-right"></i>
      </Button>
    </Box>
  );
};

export default Pagination;
