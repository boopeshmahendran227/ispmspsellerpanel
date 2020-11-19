import * as React from "react";
import { ShowroomVisitInterface } from "../../types/showroomVisit";
import { convertTo12hour } from "utils/misc";
import { getCustomerInfo } from "utils/customer";
import { Grid, Box, Flex, Divider } from "@chakra-ui/core";

interface ShowroomVisitCardProps {
  showroomVisit: ShowroomVisitInterface;
}

const ShowroomVisitCard = (props: ShowroomVisitCardProps) => {
  const { showroomVisit } = props;

  return (
    <Grid
      templateColumns="auto 1fr"
      gap={[1, 3]}
      my={1}
      fontSize={["sm", "md"]}
    >
      <Box color="secondaryTextColor.500" fontWeight="bold" textAlign="center">
        <Box>{convertTo12hour(showroomVisit.startTime)}</Box>
        <Box
          w={[1, 2]}
          h={[1, 2]}
          mx="auto"
          border="2px"
          borderRadius="full"
          borderColor="primaryColorVariant.500"
        />

        <Divider
          bg="none"
          borderLeft="1px"
          borderRight="1px"
          borderStyle="dashed"
          borderColor="primaryColorVariant.500"
          h={[4, 5]}
          mx="auto"
          my={1}
          w={0}
          orientation="vertical"
        />
        <Box
          w={[1, 2]}
          h={[1, 2]}
          mx="auto"
          border="2px"
          borderRadius="full"
          borderColor="primaryColorVariant.500"
        />

        <Box>{convertTo12hour(showroomVisit.endTime)}</Box>
      </Box>
      <Flex
        my={[1, 2]}
        px={[1, 2]}
        borderLeft="4px"
        roundedRight="lg"
        borderColor="primaryColorVariant.500"
        alignItems="center"
        bg="lightPrimaryColorVariant.50"
      >
        <Box>
          <Box>
            <Box as="span" fontWeight="bold">
              Customer {getCustomerInfo(showroomVisit)}
            </Box>{" "}
            has booked
            <br /> a visit for{" "}
            <Box as="span" fontWeight="bold">
              {showroomVisit.showroomDetails.name}
            </Box>
          </Box>
        </Box>
        <Box
          px={1}
          color={"primaryColorVariant.500"}
          fontWeight="bold"
          textTransform="uppercase"
          ml="auto"
        >
          Booked
        </Box>
      </Flex>
    </Grid>
  );
};

export default ShowroomVisitCard;
