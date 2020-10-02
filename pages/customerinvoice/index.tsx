import PageHeader from "components/atoms/PageHeader";
import SortableTable from "components/atoms/SortableTable";
import { InvoiceInterface, InvoiceStatus } from "types/invoice";
import moment from "moment";
import InvoiceStatusTag from "components/atoms/InvoiceStatusTag";
import PageError from "components/atoms/PageError";
import Loader from "components/atoms/Loader";
import useSWR from "swr";
import { formatPrice } from "utils/misc";
import TabSection from "components/atoms/TabSection";
import WithAuth from "components/atoms/WithAuth";
import Button, { ButtonType } from "components/atoms/Button";
import UpdateCreditsModal from "components/molecules/UpdateCreditsModal";
import { connect } from "react-redux";
import CreditActions from "actions/credit";
import PageContainer from "components/atoms/PageContainer";
import PageBodyContainer from "components/atoms/PageBodyContainer";
import PageHeaderContainer from "components/atoms/PageHeaderContainer";

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
        name: "Credit Amount Pending",
        valueFunc: (invoice: InvoiceInterface) => invoice.creditAmountPending,
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
        <td>{formatPrice(invoice.creditAmountPending)}</td>
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
              Record Credit Payment
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
    <PageContainer>
      <UpdateCreditsModal />
      <PageHeaderContainer>
        <PageHeader>Invoices</PageHeader>
      </PageHeaderContainer>
      <PageBodyContainer>
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
      </PageBodyContainer>
    </PageContainer>
  );
};

const mapDispatchToProps: DispatchProps = {
  updateCredits: CreditActions.updateCredits,
};

export default WithAuth(
  connect<null, DispatchProps>(null, mapDispatchToProps)(CustomerInvoice)
);
