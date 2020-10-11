import * as React from "react";
import CSSConstants from "../../constants/CSSConstants";
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
    <Grid templateColumns="auto 1fr" gap={3} my={2}>
      <Box
        color="secondaryTextColor"
        fontWeight="bold"
        textAlign="center"
        className="timing"
      >
        <div className="startTime">
          {convertTo12hour(showroomVisit.startTime)}
        </div>
        <Divider
          bg="none"
          borderLeft="1px"
          borderRight="1px"
          borderStyle="dashed"
          borderColor="primaryColor"
          h={5}
          mx="auto"
          my={1}
        />
        <div className="endTime">{convertTo12hour(showroomVisit.endTime)}</div>
      </Box>
      <Flex
        py={3}
        px={2}
        borderLeft="4px"
        roundedTopLeft={3}
        roundedBottomRight={3}
        borderColor="primaryColor"
        alignItems="center"
      >
        <Box className="info">
          <Box className="customer">
            <Box as="span" fontWeight="bold" className="customerName">
              Customer {getCustomerInfo(showroomVisit)}
            </Box>{" "}
            has booked
            <br /> a visit for{" "}
            <Box as="span" fontWeight="bold" className="showroomName">
              {showroomVisit.showroomDetails.name}
            </Box>
          </Box>
        </Box>
        <Box
          py={1}
          px={3}
          color={"primaryColor"}
          fontWeight="bold"
          textTransform="uppercase"
          ml="auto"
        >
          Booked
        </Box>
      </Flex>
      <style jsx>{`
        .startTime::after,
        .endTime::before {
          content: "";
          display: block;
          width: 0.3rem;
          height: 0.3rem;
          margin: auto;
          border-radius: 100%;
          border: 2px solid ${CSSConstants.primaryColor};
        }
        hr {
          width: 0;
          padding: 0;
          background: none;
          border: none;
          border-left: 1px dashed ${CSSConstants.primaryColor};
          border-right: 1px dashed ${CSSConstants.primaryColor};
          height: 2.3rem;
          margin: 3px auto;
        }
      `}</style>
    </Grid>
  );
};

export default ShowroomVisitCard;
