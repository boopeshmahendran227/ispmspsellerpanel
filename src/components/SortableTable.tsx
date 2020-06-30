import { useState, useEffect } from "react";
import CSSConstants from "../constants/CSSConstants";
import classNames from "classnames";
import EmptyMsg from "./EmptyMsg";

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

function isString(value) {
  return typeof value === "string" || value instanceof String;
}

const SortableTable = (props: SortableTableProps) => {
  const [data, setData] = useState(props.data);
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

  useEffect(() => {
    if (activeHeaderIndex === null) {
      setData(props.data);
      return;
    }

    const valueFunc = props.headers[activeHeaderIndex].valueFunc;

    const copy = props.data.slice(0);
    copy.sort((a, b) => {
      const convertToLowerCase = (val) => {
        if (isString(val)) return val.toLowerCase();
        return val;
      };

      const aVal = convertToLowerCase(valueFunc(a));
      const bVal = convertToLowerCase(valueFunc(b));

      if (aVal < bVal) return isAsc ? -1 : 1;
      else if (aVal > bVal) return isAsc ? 1 : -1;
      else return 0;
    });

    setData(copy);
  }, [props.data, activeHeaderIndex, isAsc]);

  if (!data || !data.length) {
    return <EmptyMsg msg={props.emptyMsg} />;
  }

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
        <tbody>{props.body(data)}</tbody>
      </table>
      <style jsx>{`
        .sortableTableContainer {
          margin: 1.6em;
          overflow-x: auto;
          overflow-y: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
        }
        .sortableTable {
          width: 100%;
          text-align: center;
        }
        .sortableTable th {
          cursor: pointer;
        }
        .sortableTable tbody {
          color: ${CSSConstants.secondaryTextColor};
        }
        /* Using :global selector to style child component - body */
        .sortableTable tbody :global(tr:nth-child(odd)) {
          background-color: #6565650f;
        }
        .sortableTable th {
          font-weight: bold;
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
      `}</style>
    </div>
  );
};

export default SortableTable;
