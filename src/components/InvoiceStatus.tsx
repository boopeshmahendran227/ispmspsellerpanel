import CSSConstants from "../constants/CSSConstants";
import Chroma from "chroma-js";
import { StatusType } from "../types/invoice";

interface StatusProps {
  type: StatusType;
}
const getCurrentColor = (type: String) => {
  switch (type) {
    case StatusType.Draft:
      return CSSConstants.disabledColor;
    case StatusType.Issued:
      return CSSConstants.lightPrimaryColor;
    case StatusType.Pending:
      return CSSConstants.warningColor;
    case StatusType.Paid:
      return CSSConstants.successColor;
    case StatusType.Partial:
      return CSSConstants.secondaryColor;
    case StatusType.Overdue:
      return CSSConstants.dangerColor;
    case StatusType.Cancelled:
      return Chroma(CSSConstants.warningColor).darken(1).css();
  }
  return "rgba(0,0,0,0)";
};
const InvoiceStatus = (props: StatusProps) => {
  const currentColor = getCurrentColor(props.type);
  return (
    <div className="invoiceStatus">
      {props.type}
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

export default InvoiceStatus;