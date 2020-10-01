import { ShowroomVisitInterface } from "../types/showroomVisit";
import EmptyMsg from "./atoms/EmptyMsg";
import ShowroomVisitCard from "components/ShowroomVisitCard";
import Loader from "./atoms/Loader";

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
          <div className="date">{dateFilter.format("dddd, MMMM DD")}</div>
          {showroomVisits.map((showroomVisit) => (
            <ShowroomVisitCard showroomVisit={showroomVisit} />
          ))}
        </>
      )}
      <style jsx>{`
        .date {
          text-transform: uppercase;
          font-weight: bold;
          margin: 1em 0;
          font-size: 0.8rem;
        }
      `}</style>
    </>
  );
};

export default ShowroomVisitsContainer;
