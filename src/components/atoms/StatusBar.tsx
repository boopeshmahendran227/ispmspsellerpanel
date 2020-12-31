import CSSConstants from "../../constants/CSSConstants";
import classNames from "classnames";
import _ from "lodash";
import { useState, useEffect } from "react";
import { Text } from "@chakra-ui/core";
import { splitCamelCase } from "utils/misc";

export enum StatusType {
  success,
  warning,
  danger,
}

interface StatusBarProps {
  activeStatuses: string[];
  statusListMap: {
    title: string;
    status: string;
    type: StatusType;
  }[];
  getStatusText: (string: string) => string | undefined;
}

const STATUS_ITEM_MARGIN = 140; // status item width in px
const STATUS_CIRCLE_WIDTH = 16; // status circle width in px
const ANIMATION_DURATION = 400; //animation duration for single status item in ms

const StatusBar = (props: StatusBarProps): JSX.Element => {
  const { activeStatuses } = props;
  const statusListMap = props.statusListMap;
  const noOfActiveItems = statusListMap.filter((status) =>
    activeStatuses.includes(status.status)
  ).length;

  const noOfTotalItems = statusListMap.length;

  // Animate active items
  const [currentActiveLength, setCurrentActiveLength] = useState(-1);
  useEffect(() => {
    _.range(noOfActiveItems).map((i) => {
      setTimeout(() => {
        setCurrentActiveLength(i);
      }, (i + 1) * ANIMATION_DURATION);
    });
  }, [activeStatuses, noOfActiveItems]);

  // Length in px to be used in css
  const activeLineLength = STATUS_CIRCLE_WIDTH + STATUS_ITEM_MARGIN;

  const statusLineLength =
    (noOfTotalItems - 1) * (STATUS_CIRCLE_WIDTH + STATUS_ITEM_MARGIN) +
    STATUS_CIRCLE_WIDTH;

  return (
    <div className="container">
      {statusListMap.map((statusItem, index) => {
        const statusText = props.getStatusText(statusItem.title);

        const classes = classNames({
          statusItem: true,
          active: index <= currentActiveLength,
          success: statusItem.type === StatusType.success,
          warning: statusItem.type === StatusType.warning,
          danger: statusItem.type === StatusType.danger,
        });

        return (
          <div key={index} className={classes}>
            <div className="statusText">{splitCamelCase(statusItem.title)}</div>
            <div className="statusCircle"></div>
            <div className="date">
              <Text w="80px" mx="auto">
                {statusText}
              </Text>
            </div>
          </div>
        );
      })}
      <style jsx>{`
        .container {
          display: flex;
        }
        .statusItem {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .statusText {
          color: ${CSSConstants.borderColor};
          white-space: nowrap;
          transition: all 0.3s;
        }
        .date {
          font-size: 0.9rem;
          color: ${CSSConstants.secondaryTextColor};
          transition: all 0.3s;
          width: ${activeLineLength + 8}px;
        }
        .statusCircle {
          width: ${STATUS_CIRCLE_WIDTH}px;
          height: ${STATUS_CIRCLE_WIDTH}px;
          background: ${CSSConstants.borderColor};
          margin-top: 0.9em;
          margin-left: ${STATUS_ITEM_MARGIN / 2}px;
          margin-right: ${STATUS_ITEM_MARGIN / 2}px;
          margin-bottom: 0.6em;
          border-radius: 100%;
          position: relative;
          transition: all 0.3s;
        }
        .statusItem.success.active .statusText {
          color: ${CSSConstants.successColor};
        }
        .statusItem.success.active .statusCircle {
          background: ${CSSConstants.successColor};
        }
        .statusItem.warning.active .statusText {
          color: #ffa500;
        }
        .statusItem.warning.active .statusCircle {
          background: #ffa500;
        }
        .statusItem.danger.active .statusText {
          color: ${CSSConstants.dangerColor};
        }
        .statusItem.danger.active .statusCircle {
          background: ${CSSConstants.dangerColor};
        }
        .statusItem.active .date {
          color: ${CSSConstants.primaryTextColor};
        }
        .statusItem .statusCircle::before {
          /* Active Status Line */
          z-index: 1;
          transform-origin: 0 50%;
          width: ${activeLineLength}px;
          transform: translateY(-50%) scaleX(0);
          transition: transform ${ANIMATION_DURATION}ms linear;
        }
        .statusItem.success.active .statusCircle::before {
          background: ${CSSConstants.successColor};
        }
        .statusItem.warning.active .statusCircle::before {
          background: #ffa500;
        }
        .statusItem.danger.active .statusCircle::before {
          background: ${CSSConstants.dangerColor};
        }
        .statusItem.active .statusCircle::before {
          transform: translateY(-50%) scaleX(1);
        }
        .statusItem:nth-child(${noOfActiveItems}) .statusCircle::before {
          width: ${activeLineLength / 2}px;
        }
        .statusItem .statusCircle::before,
        .statusItem:first-child .statusCircle::after {
          position: absolute;
          display: inline-block;
          content: "";
          height: 3px;
          background: ${CSSConstants.borderColor};
          top: 50%;
        }
        .statusItem:last-child .statusCircle::before {
          display: none;
        }
        .statusItem:first-child .statusCircle::after {
          width: ${statusLineLength}px;
          transform: translateY(-50%);
        }
      `}</style>
    </div>
  );
};

export default StatusBar;
