import React from "react";

interface StatusProps {
  className?: string;
  types: [];
  children: React.ReactNode;
}

function StatusDashboard(props) {
  const datas = [
    {
      invoiceId: 1,
      issueDate: "4/12/2020",
      customerId: "string",
      customerName: "string",
      totalAmount: 20,
      amountPending: 5,
      status: "draft",
    },
    {
      invoiceId: 1,
      issueDate: "4/12/2020",
      customerId: "string",
      customerName: "string",
      totalAmount: 20,
      amountPending: 5,
      status: "paid",
    },
    {
      invoiceId: 1,
      issueDate: "4/12/2020",
      customerId: "string",
      customerName: "string",
      totalAmount: 20,
      amountPending: 5,
      status: "overdue",
    },
    {
      invoiceId: 2,
      issueDate: "4/1/2020",
      customerId: "string",
      customerName: "string",
      totalAmount: 5,
      amountPending: 0,
      status: "partial",
    },
    {
      invoiceId: 2,
      issueDate: "4/1/2020",
      customerId: "string",
      customerName: "string",
      totalAmount: 5,
      amountPending: 0,
      status: "cancelled",
    },
    {
      invoiceId: 2,
      issueDate: "4/1/2020",
      customerId: "string",
      customerName: "string",
      totalAmount: 5,
      amountPending: 0,
      status: "issued",
    },
    {
      invoiceId: 2,
      issueDate: "4/1/2020",
      customerId: "string",
      customerName: "string",
      totalAmount: 5,
      amountPending: 0,
      status: "pending",
    },
  ];

  //  const unyique= Set(datas.map(item => item.status));
  const unique = [
    "draft",
    "paid",
    "overdue",
    "partial",
    "cancelled",
    "issued",
    "pending",
  ];
  return (
    <div>
      <div className="container">
        {unique.map((un) => (
          <span>
            <div>{datas.filter((e) => e.status === un).length}</div>
            <div>{un}</div>
          </span>
        ))}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-around;
          text-align: center;
          font-size: inherit;
          letter-spacing: 1px;
          text-transform: uppercase;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
            margin: 2em;
          padding: 1em;
        }
      `}</style>
    </div>
  );
}

export default StatusDashboard;
