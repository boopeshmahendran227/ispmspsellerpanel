import * as React from "react";
import { connect } from "react-redux";
import {
  getShowroomVisits,
  getShowroomFilterForShowroomVisit,
  getDateFilterForShowroomVisit,
} from "../../src/selectors/showroomVisit";
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

interface StateProps {
  showroomVisits: ShowroomVisitInterface[];
  showrooms: ShowroomInterface[];
  dateFilter: moment.Moment;
  showroomFilter: string;
  getFilteredShowroomVisitsState: RequestReducerState;
  getShowroomsState: RequestReducerState;
}

interface DispatchProps {
  getShowrooms: () => void;
  setDateFilter: (date: moment.Moment) => void;
  setShowroomFilter: (id: string) => void;
  getFilteredShowroomVisits: () => void;
}

type ShowroomVisitsProps = StateProps & DispatchProps;

const ShowroomVisits = (props: ShowroomVisitsProps) => {
  const handleDateChange = (date) => {
    props.setDateFilter(date);
  };

  const handleShowroomChange = (value) => {
    props.setShowroomFilter(value || null);
  };

  const { showroomVisits } = props;
  const dateFilter = moment(props.dateFilter);

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
                checked={props.showroomFilter === null}
                onChange={handleShowroomChange}
              />
            </div>
            {props.showrooms.map((showroom, index) => (
              <div key={index}>
                <RadioButton
                  key={index}
                  label={showroom.name}
                  value={showroom.id}
                  checked={props.showroomFilter === showroom.id}
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
  showroomVisits: getShowroomVisits(state),
  showrooms: getShowrooms(state),
  dateFilter: getDateFilterForShowroomVisit(state),
  showroomFilter: getShowroomFilterForShowroomVisit(state),
  getFilteredShowroomVisitsState: state.showroomVisit.showroomVisits,
  getShowroomsState: state.showroomVisit.showrooms,
});

const mapDispatchToProps: DispatchProps = {
  getFilteredShowroomVisits: ShowroomVisitActions.getFilteredShowroomVisits,
  setDateFilter: ShowroomVisitActions.setDateFilter,
  setShowroomFilter: ShowroomVisitActions.setShowroomFilter,
  getShowrooms: ShowroomVisitActions.getShowrooms,
};

const mapPropsToLoadData = (props: ShowroomVisitsProps) => {
  return [
    {
      data: props.showrooms,
      fetch: props.getShowrooms,
      loadingState: props.getShowroomsState,
    },
    {
      data: props.showroomVisits,
      fetch: props.getFilteredShowroomVisits,
      loadingState: props.getFilteredShowroomVisitsState,
    },
  ];
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithReduxDataLoader(mapPropsToLoadData)(ShowroomVisits));
