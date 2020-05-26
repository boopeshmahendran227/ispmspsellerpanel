import { FilterDataInterface } from "../types/search";
import CSSConstants from "../constants/CSSConstants";

interface ActiveFiltersProps {
  filterData: FilterDataInterface;
  clearFilters: () => void;
}

const ActiveFilters = (props: ActiveFiltersProps) => {
  const { filterData } = props;

  if (!filterData.searchText) {
    return null;
  }

  return (
    <div className="container">
      <header>Active Filters:</header>
      <div className="searchText">{filterData.searchText}</div>
      <a className="clearAllBtn" onClick={props.clearFilters}>
        Clear all
      </a>
      <style jsx>{`
        .container {
          margin: 1em 0;
          padding: 0.5em;
          border-top: 1px solid ${CSSConstants.borderColor};
          border-bottom: 1px solid ${CSSConstants.borderColor};
          display: flex;
          align-items: center;
        }
        .searchText {
          font-weight: bold;
          margin: 0.6em;
        }
        .clearAllBtn {
          font-weight: bold;
          color: ${CSSConstants.secondaryColor};
        }
      `}</style>
    </div>
  );
};

export default ActiveFilters;
