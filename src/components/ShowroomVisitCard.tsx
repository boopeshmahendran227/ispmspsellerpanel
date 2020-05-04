import * as React from "react";
import CSSConstants from "../constants/CSSConstants";
import moment from "moment";
import Chroma from "chroma-js";

interface ShowroomVisitCardProps {
  showroomVisit: any;
}

const ShowroomVisitCard = (props: ShowroomVisitCardProps) => {
  const stateBackgroundColor = CSSConstants.primaryColor;

  return (
    <section className="container">
      <div className="timing">
        <div className="startTime">
          {moment(props.showroomVisit.startDateTime).format("hh:mm A")}
        </div>
        <hr />
        <div className="endTime">
          {moment(props.showroomVisit.endDateTime).format("hh:mm A")}
        </div>
      </div>
      <div className="card">
        <div className="info">
          <div className="customer">
            {props.showroomVisit.customer
              ? props.showroomVisit.customer.name
              : "The Customer associated with this showroomvisit is deleted"}
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: auto 1fr;
          grid-gap: 1.5em;
          margin: 1.2em 0;
          cursor: pointer;
        }
        .card {
          padding: 1em 2em;
          margin-bottom: 1em;
          display: flex;
          align-items: center;
          background: ${Chroma(stateBackgroundColor).alpha(0.15).css()};
          border-left: 6px solid ${stateBackgroundColor};
          border-top-right-radius: 3em;
          border-bottom-right-radius: 3em;
        }
        .customer {
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
          border: 2px solid ${stateBackgroundColor};
        }
        hr {
          width: 0;
          padding: 0;
          background: none;
          border: none;
          border-left: 2px dashed ${stateBackgroundColor};
          border-right: 2px dashed ${stateBackgroundColor};
          height: 2.3rem;
          margin: 3px auto;
        }
      `}</style>
    </section>
  );
};

export default ShowroomVisitCard;
