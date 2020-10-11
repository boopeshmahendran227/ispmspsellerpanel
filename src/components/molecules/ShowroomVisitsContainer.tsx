import { ShowroomVisitInterface } from "../../types/showroomVisit";
import EmptyMsg from "../atoms/EmptyMsg";
import ShowroomVisitCard from "components/atoms/ShowroomVisitCard";
import Loader from "../atoms/Loader";
import { Box } from "@chakra-ui/core";

interface ShowroomVisitsContainerProps {
  showroomVisits: ShowroomVisitInterface[] | undefined;
  dateFilter: moment.Moment;
}

const ShowroomVisitsContainer = (props: ShowroomVisitsContainerProps) => {
  const { showroomVisits, dateFilter } = props;

  if (!showroomVisits) {
    return <Loader />;
  }

  return (
    <>
      {showroomVisits && showroomVisits.length === 0 && (
        <EmptyMsg msg="No Showroom Visits match the currently selected filters." />
      )}
      {showroomVisits && showroomVisits.length > 0 && (
        <>
          <Box textTransform="uppercase" fontWeight="bold" my={3} fontSize="sm">
            {dateFilter.format("dddd, MMMM DD")}
          </Box>
          {showroomVisits.map((showroomVisit) => (
            <ShowroomVisitCard showroomVisit={showroomVisit} />
          ))}
        </>
      )}
    </>
  );
};

export default ShowroomVisitsContainer;
