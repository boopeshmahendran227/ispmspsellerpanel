import * as React from "react";
import { connect } from "react-redux";
import { getShowrooms } from "../../src/selectors/showroomVisit";
import WithReduxDataLoader from "../../src/components/WithReduxDataLoader";
import ShowroomVisitCard from "../../src/components/ShowroomVisitCard";
import moment from "moment";
import SingleDatePicker from "../../src/components/SingleDatePicker";
import ShowroomVisitActions from "../../src/actions/showroomVisit";
import RadioButton from "../../src/components/RadioButton";
import CSSConstants from "../../src/constants/CSSConstants";
import EmptyMsg from "../../src/components/EmptyMsg";
import _ from "lodash";
import {
  ShowroomInterface,
  ShowroomVisitInterface,
} from "../../src/types/showroomVisit";
import { RootState } from "../../src/reducers";
import { RequestReducerState } from "../../src/reducers/utils";
import WithAuth from "../../src/components/WithAuth";
import useSWR from "swr";
import { useState } from "react";
import PageError from "../../src/components/PageError";
import Loader from "../../src/components/Loader";

interface StateProps {
  showrooms: ShowroomInterface[];
  getShowroomsState: RequestReducerState;
}

interface DispatchProps {
  getShowrooms: () => void;
}

type ShowroomVisitsProps = StateProps & DispatchProps;

const ShowroomVisits = (props: ShowroomVisitsProps) => {
  const [showroomFilter, setShowroomFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState(moment());

  const swr = useSWR(
    `/showroom/seller?showroomId=${showroomFilter}&date=${moment(dateFilter)
      .utc()
      .format("YYYY-MM-DD")}`
  );

  const showroomVisits: ShowroomVisitInterface[] = swr.data;
  const error = swr.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!showroomVisits) {
    return <Loader />;
  }

  const handleDateChange = (date) => {
    setDateFilter(date);
  };

  const handleShowroomChange = (value) => {
    setShowroomFilter(value || null);
  };

  return (
    <div className="container">
      <div className="showroomVisitsContainer">
        <h1>Showroom Visits</h1>
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
      </div>
      <div className="filterContainer">
        <SingleDatePicker onChange={handleDateChange} value={dateFilter} />

        <div className="showroomFilterContainer">
          <header>Showrooms</header>
          <div className="body">
            <div>
              <RadioButton
                label="All Showrooms"
                value={null}
                checked={showroomFilter === null}
                onChange={handleShowroomChange}
              />
            </div>
            {props.showrooms.map((showroom, index) => (
              <div key={index}>
                <RadioButton
                  key={index}
                  label={showroom.name}
                  value={showroom.id}
                  checked={showroomFilter === showroom.id}
                  onChange={handleShowroomChange}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr auto;
          grid-gap: 5em;
          padding: 2em;
          max-width: 1200px;
          margin: auto;
        }
        .date {
          text-transform: uppercase;
          font-weight: bold;
          margin: 1em 0;
          font-size: 0.8rem;
        }
        .showroomFilterContainer {
          background: white;
          margin-top: 2em;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05),
            0 0 0 1px rgba(0, 0, 0, 0.07);
          border-radius: 0.2em;
        }
        .showroomFilterContainer header {
          font-weight: bold;
          border-bottom: 1px solid ${CSSConstants.disabledColor};
        }
        .showroomFilterContainer header,
        .showroomFilterContainer .body {
          padding: 0.8em 1.7em;
        }
        .filterContainer {
          padding: 2em;
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  showrooms: getShowrooms(state),
  getShowroomsState: state.showroomVisit.showrooms,
});

const mapDispatchToProps: DispatchProps = {
  getShowrooms: ShowroomVisitActions.getShowrooms,
};

const mapPropsToLoadData = (props: ShowroomVisitsProps) => {
  return [
    {
      data: props.showrooms,
      fetch: props.getShowrooms,
      loadingState: props.getShowroomsState,
    },
  ];
};

export default WithAuth(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithReduxDataLoader(mapPropsToLoadData)(ShowroomVisits))
);
