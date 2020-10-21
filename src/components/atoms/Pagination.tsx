import CSSConstants from "../../constants/CSSConstants";
import classNames from "classnames";
import Chroma from "chroma-js";
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

  const pages = _.range(low, high + 1).map((i) => {
    const classes = classNames({
      page: true,
      active: value === i,
    });

    return (
      <Box display="inline-block" mx={1} key={i}>
        <Button
          variantColor={value === i ? "primaryColorVariant" : ""}
          color={value === i ? "white" : ""}
          type="button"
          size="xs"
          transition="all 0.3s"
          onClick={() => handleClick(i)}
        >
          {i}
        </Button>
      </Box>
    );
  });

  return (
    <Box w="100%" textAlign="center" my={3}>
      <Button
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
