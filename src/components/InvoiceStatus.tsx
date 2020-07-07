import CSSConstants from "../constants/CSSConstants";
import classNames from "classnames";
import Chroma from "chroma-js";
import { StatusType } from "../types/invoice";

interface StatusProps {
  className?: string;
  type: StatusType;
  children: React.ReactNode;
}
const getCurrentColor = (type: String) => {
  switch (type) {
    case "Draft":
      return CSSConstants.disabledColor;
    case "Issued":
      return CSSConstants.lightPrimaryColor;
    case "Pending":
      return CSSConstants.warningColor;
    case "Paid":
      return CSSConstants.successColor;
    case "Partial":
      return CSSConstants.secondaryColor;
    case "Overdue":
      return CSSConstants.dangerColor;
    case "Cancelled":
      return Chroma(CSSConstants.warningColor).darken(1).css();
  }
  return "rgba(0,0,0,0)"
};
const InvoiceStatus = (props: StatusProps) => {
  const classes = classNames({
    [props.className]: true,
  });
  const currentColor = getCurrentColor(props.type);
  return (
    <div className={classes}>
      {props.children}
      <style jsx>{`
        div {
          padding: 0.5em 0.5em;
          margin: 0.2em;
          font-weight: 900;
          background: ${currentColor};
          font-size: inherit;
          border: none;
          color: rgb(255, 255, 255);
          letter-spacing: 1.2px;
          text-transform: uppercase;
          border-radius: 25px;
          display: inline-block;
          width: 50%;
        }
      `}</style>
    </div>
  );
};

InvoiceStatus.defaultProps = {
  type: "Draft",
  className: "",
};

export default InvoiceStatus;