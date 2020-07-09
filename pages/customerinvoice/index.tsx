import CSSConstants from "../../src/constants/CSSConstants";
import PageHeader from "../../src/components/PageHeader";
import SortableTable from "../../src/components/SortableTable";
import { InvoiceInterface, InvoiceStatus } from "../../src/types/invoice";
import moment from "moment";
import InvoiceStatusTag from "../../src/components/InvoiceStatusTag";
import PageError from "../../src/components/PageError";
import Loader from "../../src/components/Loader";
import useSWR from "swr";
import { formatPrice } from "../../src/utils/misc";
import TabSection from "../../src/components/TabSection";
import WithAuth from "../../src/components/WithAuth";
import Button, { ButtonType } from "../../src/components/Button";
import UpdateCreditsModal from "../../src/components/UpdateCreditsModal";
import { connect } from "react-redux";
import CreditActions from "../../src/actions/credit";

interface DispatchProps {
  updateCredits: (invoice: InvoiceInterface) => void;
}

type CustomerInvoiceProps = DispatchProps;

const CustomerInvoice = (props: CustomerInvoiceProps) => {
  const swr = useSWR("/invoice");
  const invoiceList: InvoiceInterface[] = swr.data;
  const error = swr.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!invoiceList) {
    return <Loader />;
  }

  const pendingInvoices = invoiceList.filter((invoice) =>
    [InvoiceStatus.Partial, InvoiceStatus.Pending].includes(invoice.status)
  );

  const paidInvoices = invoiceList.filter(
    (invoice) => invoice.status === InvoiceStatus.Paid
  );

  const cancelledInvoices = invoiceList.filter(
    (invoice) => invoice.status === InvoiceStatus.Cancelled
  );

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
        valueFunc: (invoice: InvoiceInterface) => invoice.issuedDate,
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
      {
        name: "Action",
        valueFunc: (invoice: InvoiceInterface) => null,
      },
    ];
  };

  const renderTableBody = (invoices: InvoiceInterface[]) => {
    const openInvoice = (id) => {
      window.open(`/invoice/${id}`);
    };

    return invoices.map((invoice) => (
      <tr
        key={invoice.invoiceId}
        onClick={() => openInvoice(invoice.orderItemId)}
      >
        <td>{invoice.invoiceId}</td>
        <td>{invoice.customerName}</td>
        <td>
          {moment
            .utc(invoice.issuedDate)
            .local()
            .format("MMMM Do YYYY, hh:mm A")}
        </td>
        <td>{formatPrice(invoice.totalAmount)}</td>
        <td>{formatPrice(invoice.amountPending)}</td>
        <td>
          <InvoiceStatusTag status={invoice.status} />
        </td>
        <td>
          {[InvoiceStatus.Pending, InvoiceStatus.Partial].includes(
            invoice.status
          ) && (
            <Button
              type={ButtonType.success}
              onClick={(e) => {
                props.updateCredits(invoice);
                e.stopPropagation();
              }}
            >
              Update Credits
            </Button>
          )}
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
      <UpdateCreditsModal />
      <PageHeader>Invoices</PageHeader>
      <TabSection
        headingList={[
          `All Invoices (${invoiceList.length})`,
          `Pending Invoices (${pendingInvoices.length})`,
          `Paid Invoices (${paidInvoices.length})`,
          `Cancelled Invoices (${cancelledInvoices.length})`,
        ]}
        contentList={[
          <SortableTable
            initialSortData={{
              index: 2,
              isAsc: false,
            }}
            headers={getTableHeaders()}
            data={invoiceList}
            emptyMsg="There are no invoices"
            body={renderTableBody}
          />,
          <SortableTable
            initialSortData={{
              index: 2,
              isAsc: false,
            }}
            headers={getTableHeaders()}
            data={pendingInvoices}
            emptyMsg="There are no pending invoices"
            body={renderTableBody}
          />,
          <SortableTable
            initialSortData={{
              index: 2,
              isAsc: false,
            }}
            headers={getTableHeaders()}
            data={paidInvoices}
            emptyMsg="There are no paid invoices"
            body={renderTableBody}
          />,
          <SortableTable
            initialSortData={{
              index: 2,
              isAsc: false,
            }}
            headers={getTableHeaders()}
            data={cancelledInvoices}
            emptyMsg="There are no cancelled invoices"
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

const mapDispatchToProps: DispatchProps = {
  updateCredits: CreditActions.updateCredits,
};

export default WithAuth(
  connect<null, DispatchProps>(null, mapDispatchToProps)(CustomerInvoice)
);
