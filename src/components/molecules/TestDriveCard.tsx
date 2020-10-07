import { TestDriveInterface } from "../../types/testdrive";
import RelativeImg from "../atoms/RelativeImg";
import moment from "moment";
import { getCustomerInfo } from "utils/customer";
import { Box, Flex } from "@chakra-ui/core";

interface TestDriveCardProps {
  testdrive: TestDriveInterface;
}

const TestDriveCard = (props: TestDriveCardProps) => {
  const { testdrive } = props;
  return (
    <Flex
      box-shadow="0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24)"
      m="1em 0"
    >
      <Box w="100px" h="100px" mr="0.5em">
        <RelativeImg src={testdrive.images[0]} />
      </Box>
      <Box p="0.4em">
        <Box m="0.3em 0">
          <i className="fas fa-user"></i>
          <Box as="span" fontWeight="semibold">
            Customer {getCustomerInfo(testdrive)}
          </Box>
        </Box>{" "}
        <Box m="0.3em 0">
          <i className="fa fa-motorcycle" aria-hidden="true"></i>
          Test drive requested for
          <Box as="span" fontWeight="semibold">
            {testdrive.productName} ({"#" + testdrive.productId})
          </Box>{" "}
          on{" "}
          <Box as="span" fontWeight="semibold">
            {moment(testdrive.requestedDate).format("MMM D, YYYY")}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default TestDriveCard;
