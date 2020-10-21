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
    <Grid templateColumns="auto 1fr" gap={3} my={1}>
      <Box color="secondaryTextColor" fontWeight="bold" textAlign="center">
        <Box>{convertTo12hour(showroomVisit.startTime)}</Box>
        <Box
          w={2}
          h={2}
          mx="auto"
          border="2px"
          borderRadius="full"
          borderColor="primaryColor"
        />

        <Divider
          bg="none"
          borderLeft="1px"
          borderRight="1px"
          borderStyle="dashed"
          borderColor="primaryColor"
          h={5}
          mx="auto"
          my={1}
          w={0}
          orientation="vertical"
        />
        <Box
          w={2}
          h={2}
          mx="auto"
          border="2px"
          borderRadius="full"
          borderColor="primaryColor"
        />

        <Box>{convertTo12hour(showroomVisit.endTime)}</Box>
      </Box>
      <Flex
        my={2}
        px={2}
        borderLeft="4px"
        roundedRight="lg"
        borderColor="primaryColor"
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
          color={"primaryColor"}
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
