import CSSConstants from "../constants/CSSConstants";

interface ActiveFiltersProps {
  appliedFilters: string[];
  clearFilters: () => void;
}

const ActiveFilters = (props: ActiveFiltersProps) => {
  const { appliedFilters } = props;

  if (appliedFilters.length <= 0) {
    return null;
  }

  return (
    <div className="container">
      <header>Active Filters:</header>
      {appliedFilters.map((filter) => (
        <div className="filter">{filter}</div>
      ))}
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
        .filter {
          font-weight: bold;
          margin: 0.6em;
        }
        .filter::before {
          content: "'";
        }
        .filter::after {
          content: "'";
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
