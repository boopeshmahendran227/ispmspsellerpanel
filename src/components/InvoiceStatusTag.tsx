import CSSConstants from "../constants/CSSConstants";
import Chroma from "chroma-js";
import { InvoiceStatus } from "../types/invoice";

const getCurrentColor = (status: InvoiceStatus) => {
  switch (status) {
    case InvoiceStatus.Draft:
      return CSSConstants.disabledColor;
    case InvoiceStatus.Issued:
      return CSSConstants.lightPrimaryColor;
    case InvoiceStatus.Pending:
    case InvoiceStatus.Partial:
    case InvoiceStatus.Overdue:
      return CSSConstants.warningColor;
    case InvoiceStatus.Paid:
      return CSSConstants.successColor;
    case InvoiceStatus.Cancelled:
      return CSSConstants.dangerColor;
  }
};

interface InvoiceStatusTagProps {
  status: InvoiceStatus;
}

const InvoiceStatusTag = (props: InvoiceStatusTagProps) => {
  const { status } = props;
  const currentColor = getCurrentColor(status);

  return (
    <div className="container">
      {status}
      <style jsx>{`
        .container {
          padding: 0.5em 1.1em;
          margin: 0.9em 0;
          font-weight: bold;
          background: ${Chroma(currentColor).alpha(0.2).css()};
          color: ${currentColor};
          border-radius: 25px;
          display: inline-block;
          min-width: 100px;
        }
      `}</style>
    </div>
  );
};

export default InvoiceStatusTag;
