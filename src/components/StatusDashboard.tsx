import { InvoiceInterface, InvoiceStatus } from "../types/invoice";

export interface StatusProps {
  values: InvoiceInterface[];
}

const statusList = [
  InvoiceStatus.Draft,
  InvoiceStatus.Issued,
  InvoiceStatus.Pending,
  InvoiceStatus.Paid,
  InvoiceStatus.Partial,
  InvoiceStatus.Overdue,
  InvoiceStatus.Cancelled,
];

const StatusDashboard = (props: StatusProps) => {
  return (
    <div className="container">
      {statusList.map((status) => (
        <div className="statusContainer" key={status}>
          <div className="statusCount">
            {props.values.filter((value) => value.status === status).length}
          </div>
          <div>{status}</div>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-around;
        }
        .statusContainer {
          display: inline-block;
          width: 120px;
          text-align: center;
          font-size: inherit;
          font-weight: 900;
          letter-spacing: 1px;
          text-transform: uppercase;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
          margin: 2em;
          padding: 1em;
        }
        .statusCount {
          font-size: 2rem;
        }
      `}</style>
    </div>
  );
};

export default StatusDashboard;
