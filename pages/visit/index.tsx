import * as React from "react";
import { connect } from "react-redux";
import {
  getShowroomVisits,
  getDateRangeFilterForShowroomVisit,
  getShowroomFilterForShowroomVisit,
} from "../../src/selectors/showroomVisit";
import { getShowrooms } from "../../src/selectors/showroomVisit";
import WithReduxDataLoader from "../../src/components/WithReduxDataLoader";
import ShowroomVisitCard from "../../src/components/ShowroomVisitCard";
import moment from "moment";
import DateRangePicker from "../../components/DateRangePicker";
import ShowroomVisitActions from "../../src/actions/showroomVisit";
import RadioButton from "../../src/components/RadioButton";
import CSSConstants from "../../src/constants/CSSConstants";
import EmptyMsg from "../../src/components/EmptyMsg";
import _ from "lodash";
import {
  ShowroomInterface,
  DateRangeFilterInterface,
} from "../../src/types/showroomVisit";
import { RootState } from "../../src/reducers";
import { RequestReducerState } from "../../src/reducers/utils";

interface StateProps {
  showroomVisits: any[];
  showrooms: ShowroomInterface[];
  dateRangeFilter: any;
  showroomFilter: string;
  getFilteredShowroomVisitsState: RequestReducerState;
  getShowroomsState: RequestReducerState;
}

interface DispatchProps {
  getShowrooms: () => void;
  setDateRangeFilter: (dateRangeFilter: DateRangeFilterInterface) => void;
  setShowroomFilter: (id: string) => void;
  getFilteredShowroomVisits: () => void;
}

type ShowroomVisitsProps = StateProps & DispatchProps;

class ShowroomVisits extends React.Component<ShowroomVisitsProps> {
  handleDatesChange = ({ startDate, endDate }) => {
    this.props.setDateRangeFilter({
      startDate,
      endDate,
    });

    if (startDate && endDate) {
      this.props.getFilteredShowroomVisits();
    }
  };

  handleStaffChange = (e) => {
    this.props.setShowroomFilter(e.target.value);

    this.props.getFilteredShowroomVisits();
  };

  render = () => {
    const startDate = this.props.dateRangeFilter.startDate
      ? moment(this.props.dateRangeFilter.startDate)
      : null;
    const endDate = this.props.dateRangeFilter.endDate
      ? moment(this.props.dateRangeFilter.endDate)
      : null;

    const showroomVisitsByDate = _.chain(this.props.showroomVisits)
      .sortBy((showroomVisit) => moment(showroomVisit.startDateTime))
      .groupBy((showroomVisit) =>
        moment(showroomVisit.startDateTime).format("dddd, MMMM DD")
      )
      .map((values, key) => {
        return {
          date: key,
          showroomVisits: values,
        };
      })
      .value();

    return (
      <div className="container">
        <div className="filterContainer">
          <DateRangePicker
            onDatesChange={this.handleDatesChange}
            startDate={startDate}
            endDate={endDate}
          />

          <div className="showroomFilterContainer">
            <header>Showrooms</header>
            <div className="body">
              <div>
                <RadioButton
                  label="All Showrooms"
                  value=""
                  checked={this.props.showroomFilter === null}
                  onChange={this.handleStaffChange}
                />
              </div>
              {this.props.showrooms.map((showroom, index) => (
                <div key={index}>
                  <RadioButton
                    key={index}
                    label={showroom.name}
                    value={showroom.id}
                    checked={this.props.showroomFilter === showroom.id}
                    onChange={this.handleStaffChange}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="showroomvisitsContainer">
          <h1>Showroom Visits</h1>
          {!showroomVisitsByDate ||
            (Boolean(!showroomVisitsByDate.length) && (
              <EmptyMsg msg="No Showroom Visits match the currently selected filters." />
            ))}
          {showroomVisitsByDate.map(({ date, showroomvisits }, index) => {
            return (
              <div className="dayShowroomVisitContainer" key={index}>
                <div className="date"> {date} </div>
                {showroomvisits.map((showroomvisit) => (
                  <ShowroomVisitCard
                    key={showroomvisit.id}
                    data={showroomvisit}
                  />
                ))}
              </div>
            );
          })}
        </div>
        <style jsx>{`
          .container {
            display: grid;
            grid-template-columns: auto 1fr;
            grid-gap: 5em;
            padding: 2em;
            max-width: 1200px;
            margin: auto;
          }
          .date {
            text-transform: uppercase;
            font-weight: bold;
            margin: 1em;
            font-size: 0.8rem;
          }
          .staffFilterContainer {
            background: white;
            margin-top: 2em;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05),
              0 0 0 1px rgba(0, 0, 0, 0.07);
            border-radius: 0.2em;
          }
          .staffFilterContainer header {
            font-weight: bold;
            border-bottom: 1px solid ${CSSConstants.disabledColor};
          }
          .staffFilterContainer header,
          .staffFilterContainer .body {
            padding: 0.8em 1.7em;
          }
          .filterContainer {
            padding: 2em;
          }
          .showroomvisitsContainer {
            position: relative;
          }
          .dayShowroomVisitContainer {
            margin-top: 4em;
          }
        `}</style>
      </div>
    );
  };
}

const mapStateToProps = (state: RootState): StateProps => ({
  showroomVisits: getShowroomVisits(state),
  showrooms: getShowrooms(state),
  dateRangeFilter: getDateRangeFilterForShowroomVisit(state),
  showroomFilter: getShowroomFilterForShowroomVisit(state),
  getFilteredShowroomVisitsState: state.showroomVisit.showroomVisits,
  getShowroomsState: state.showroomVisit.showrooms,
});

const mapDispatchToProps: DispatchProps = {
  getFilteredShowroomVisits: ShowroomVisitActions.getFilteredShowroomVisits,
  setDateRangeFilter: ShowroomVisitActions.setDateRangeFilter,
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
