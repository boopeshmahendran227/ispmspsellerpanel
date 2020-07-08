import CSSConstants from "../../src/constants/CSSConstants";
import PageHeader from "../../src/components/PageHeader";
import SortableTable from "../../src/components/SortableTable";
import { InvoiceInterface, StatusType } from "../../src/types/invoice";
import moment from "moment";
import InvoiceStatus from "../../src/components/InvoiceStatus";
import PageError from "../../src/components/PageError";
import Loader from "../../src/components/Loader";
import useSWR from "swr";
import { formatPrice } from "../../src/utils/misc";
import TabSection from "../../src/components/TabSection";

const CustomerInvoice = () => {
  const swr = useSWR("/invoice");
  const invoiceList: InvoiceInterface[] = swr.data;
  const error = swr.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }
  if (!invoiceList) {
    return <Loader />;
  }
  const draft = invoiceList.filter((e) => e.status === StatusType.Draft);
  const issued = invoiceList.filter((e) => e.status === StatusType.Issued);
  const pending = invoiceList.filter((e) => e.status === StatusType.Pending);
  const paid = invoiceList.filter((e) => e.status === StatusType.Paid);
  const partial = invoiceList.filter((e) => e.status === StatusType.Partial);
  const overdue = invoiceList.filter((e) => e.status === StatusType.Overdue);
  const cancelled = invoiceList.filter((e) => e.status === StatusType.Cancelled);
  const getTableHeaders = () => {
    return [
      {
        name: "Invoice Id",
        valueFunc: (invoice: InvoiceInterface) => invoice.invoiceId,
      },
      {
        name: "Customer Name",
        valueFunc: (invoice: InvoiceInterface) => invoice.customerName,
      },
      {
        name: "Issued Date",
        valueFunc: (invoice: InvoiceInterface) => invoice.issueDate,
      },

      {
        name: "Total amount",
        valueFunc: (invoice: InvoiceInterface) => invoice.totalAmount,
      },
      {
        name: "Amount Pending",
        valueFunc: (invoice: InvoiceInterface) => invoice.amountPending,
      },
      {
        name: "Status",
        valueFunc: (invoice: InvoiceInterface) => invoice.status,
      },
    ];
  };
  const renderTableBody = (invoices: InvoiceInterface[]) => {
    return invoices.map((invoice) => (
      <tr key={invoice.invoiceId}>
        <td>{invoice.invoiceId}</td>
        <td>{invoice.customerName}</td>
        <td>
          {moment
            .utc(invoice.issueDate)
            .local()
            .format("MMMM Do YYYY, hh:mm A")}
        </td>
        <td>{formatPrice(invoice.totalAmount)}</td>
        <td>{formatPrice(invoice.amountPending)}</td>
        <td>
          <InvoiceStatus type={invoice.status} />
        </td>
        <style jsx>{`
          tr:hover {
            cursor: pointer;
          }
        `}</style>
      </tr>
    ));
  };

  return (
    <div className="container">
      <PageHeader>Invoice</PageHeader>
      <TabSection
        headingList={[
          `All (${invoiceList.length})`,
          `Draft (${draft.length})`,
          `Issued (${issued.length})`,
          `Pending (${pending.length})`,
          `Paid (${paid.length})`,
          `Partial (${partial.length})`,
          `Overdue (${overdue.length})`,
          `Cancelled (${cancelled.length})`,
        ]}
        headingWidth="170px"
        contentList={[
          <SortableTable
            initialSortData={{
              index: 1,
              isAsc: false,
            }}
            headers={getTableHeaders()}
            data={invoiceList}
            emptyMsg="No Invoice yet"
            body={renderTableBody}
          />,
          <SortableTable
            initialSortData={{
              index: 1,
              isAsc: false,
            }}
            headers={getTableHeaders()}
            data={draft}
            emptyMsg="No Invoice yet"
            body={renderTableBody}
          />,
          <SortableTable
            initialSortData={{
              index: 1,
              isAsc: false,
            }}
            headers={getTableHeaders()}
            data={issued}
            emptyMsg="No Invoice yet"
            body={renderTableBody}
          />,
          <SortableTable
            initialSortData={{
              index: 1,
              isAsc: false,
            }}
            headers={getTableHeaders()}
            data={pending}
            emptyMsg="No Invoice yet"
            body={renderTableBody}
          />,
          <SortableTable
            initialSortData={{
              index: 1,
              isAsc: false,
            }}
            headers={getTableHeaders()}
            data={paid}
            emptyMsg="No Invoice yet"
            body={renderTableBody}
          />,
          <SortableTable
            initialSortData={{
              index: 1,
              isAsc: false,
            }}
            headers={getTableHeaders()}
            data={partial}
            emptyMsg="No Invoice yet"
            body={renderTableBody}
          />,
          <SortableTable
            initialSortData={{
              index: 1,
              isAsc: false,
            }}
            headers={getTableHeaders()}
            data={overdue}
            emptyMsg="No Invoice yet"
            body={renderTableBody}
          />,
          <SortableTable
            initialSortData={{
              index: 1,
              isAsc: false,
            }}
            headers={getTableHeaders()}
            data={cancelled}
            emptyMsg="No Invoice yet"
            body={renderTableBody}
          />,
        ]}
      />
      <style jsx>{`
        .container {
          padding: 1em;
          margin: 1em auto;
          font-size: 0.9rem;
          background: ${CSSConstants.foregroundColor};
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
        }
      `}</style>
    </div>
  );
};

export default CustomerInvoice;
