import { useState } from "react";
import CSSConstants from "../constants/CSSConstants";
import classNames from "classnames";
import EmptyMsg from "./EmptyMsg";
import _ from "lodash";

interface SortHeader {
  name: string;
  valueFunc: (any) => any;
}

export interface SortableTableInitialSortData {
  index: number;
  isAsc: boolean;
}

interface SortableTableProps {
  headers: SortHeader[];
  data: any[];
  body: (data: any) => React.ReactNode;
  emptyMsg?: string;
  initialSortData: SortableTableInitialSortData;
}

const isString = (value) => {
  return typeof value === "string" || value instanceof String;
};

const convertToLowerCase = (val) => {
  if (isString(val)) return val.toLowerCase();
  return val;
};

const sortData = (headers, data, index, isAsc) => {
  if (index === null) {
    return data;
  }

  const valueFunc = headers[index].valueFunc;

  return _.orderBy(
    data,
    [
      (item) => {
        return convertToLowerCase(valueFunc(item));
      },
    ],
    [isAsc ? "asc" : "desc"]
  );
};

const SortableTable = (props: SortableTableProps): JSX.Element => {
  const { data } = props;
  const [activeHeaderIndex, setActiveHeaderIndex] = useState(
    props.initialSortData.index
  );
  const [isAsc, setIsAsc] = useState(props.initialSortData.isAsc);

  const handleHeaderClick = (index) => {
    if (index === activeHeaderIndex) {
      setIsAsc(!isAsc);
    } else {
      setIsAsc(false);
    }
    setActiveHeaderIndex(index);
  };

  if (!data || !data.length) {
    return <EmptyMsg msg={props.emptyMsg} />;
  }

  const sortedData = sortData(props.headers, data, activeHeaderIndex, isAsc);

  return (
    <div className="sortableTableContainer">
      <table className="sortableTable">
        <thead>
          <tr>
            {props.headers.map((header, index) => {
              const classes = classNames({
                active: index === activeHeaderIndex,
                isAsc: isAsc,
              });
              return (
                <th
                  key={index}
                  onClick={handleHeaderClick.bind(null, index)}
                  className={classes}
                >
                  {header.name}
                  <i className="icon fas fa-caret-down" aria-hidden="true"></i>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{props.body(sortedData)}</tbody>
      </table>
      <style jsx>{`
        .sortableTableContainer {
          margin-top: 1em;
          margin-bottom: 2em;
          overflow-x: auto;
          overflow-y: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
          background: ${CSSConstants.foregroundColor};
        }
        .sortableTable {
          width: 100%;
          overflow-x: auto;
        }
        .sortableTable th {
          cursor: pointer;
          text-align: center;
        }
        .sortableTable tbody {
          color: ${CSSConstants.secondaryTextColor};
        }
        /* Using :global selector to style child component - body */
        .sortableTable tbody :global(tr:nth-child(odd)) {
          background-color: #6565650f;
        }
        .sortableTable th {
          position: relative;
        }
        .sortableTable th .icon {
          position: absolute;
          top: 50%;
          height: 0.9rem;
          margin: 0.1em;
          transform: translateY(-50%);
          transition: transform 0.3s;
          display: none;
        }
        .sortableTable th.active .icon {
          display: inline-block;
        }
        .sortableTable th.active.isAsc .icon {
          transform: translateY(-50%) rotate(180deg);
        }
        .sortableTable :global(a) {
          cursor: pointer;
          color: ${CSSConstants.primaryColor};
          text-decoration: underline;
        }
        .sortableTable :global(tr) {
          text-align: center !important;
        }
      `}</style>
    </div>
  );
};

export default SortableTable;
