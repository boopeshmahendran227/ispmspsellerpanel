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
    <Flex boxShadow="sm" my={2} fontSize={["sm", "md"]}>
      <Box w="100px" h="100px" mr={2}>
        <RelativeImg src={testdrive.images[0]} />
      </Box>
      <Box p={3}>
        <Box my={2}>
          <i className="fas fa-user"></i>
          <Box as="span" fontWeight="semibold">
            Customer {getCustomerInfo(testdrive)}
          </Box>
        </Box>{" "}
        <Box my={2}>
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
