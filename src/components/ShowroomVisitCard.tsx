import * as React from "react";
import CSSConstants from "../constants/CSSConstants";
import { ShowroomVisitInterface } from "../types/showroomVisit";
import { convertTo12hour } from "utils/misc";
import { getCustomerInfo } from "utils/customer";

interface ShowroomVisitCardProps {
  showroomVisit: ShowroomVisitInterface;
}

const ShowroomVisitCard = (props: ShowroomVisitCardProps) => {
  const { showroomVisit } = props;

  return (
    <section className="container">
      <div className="timing">
        <div className="startTime">
          {convertTo12hour(showroomVisit.startTime)}
        </div>
        <hr />
        <div className="endTime">{convertTo12hour(showroomVisit.endTime)}</div>
      </div>
      <div className="card">
        <div className="info">
          <div className="customer">
            <span className="customerName">
              Customer {getCustomerInfo(showroomVisit)}
            </span>{" "}
            has booked
            <br /> a visit for{" "}
            <span className="showroomName">
              {showroomVisit.showroomDetails.name}
            </span>
          </div>
        </div>
        <div className="state">Booked</div>
      </div>
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: auto 1fr;
          grid-gap: 1.5em;
          margin: 1.2em 0;
        }
        .card {
          padding: 1em 2em;
          margin-bottom: 1em;
          display: flex;
          align-items: center;
          background: rgba(172, 198, 255, 0.15);
          border-left: 4px solid ${CSSConstants.primaryColor};
          border-top-right-radius: 3em;
          border-bottom-right-radius: 3em;
        }
        .customerName,
        .showroomName {
          font-weight: bold;
        }
        .timing {
          color: rgba(0, 0, 0, 0.8);
          font-weight: bold;
          text-align: center;
        }
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
        .state {
          padding: 0.3em 0.5em;
          color: ${CSSConstants.primaryColor};
          font-weight: bold;
          text-transform: uppercase;
          margin-left: auto;
        }
      `}</style>
    </section>
  );
};

export default ShowroomVisitCard;
