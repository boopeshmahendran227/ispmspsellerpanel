import CSSConstants from "../../src/constants/CSSConstants";
import SortableTable from "../../src/components/SortableTable";
import useSWR from "swr";
import Loader from "../../src/components/Loader";
import PageError from "../../src/components/PageError";
import PageHeader from "../../src/components/PageHeader";
import { CustomerInterface } from "../../src/types/customer";

const Customers = () => {
  const getTableHeaders = () => {
    return [
      {
        name: "Name",
        valueFunc: (customer: CustomerInterface) => customer.name,
      },
      {
        name: "Phone",
        valueFunc: (customer: CustomerInterface) => customer.mobile,
      },
      {
        name: "Email",
        valueFunc: (customer: CustomerInterface) => customer.email,
      },
    ];
  };

  const renderTableBody = (customers: CustomerInterface[]) => {
    return customers.map((customer) => (
      <tr>
        <td>{customer.name}</td>
        <td>{customer.mobile}</td>
        <td>{customer.email}</td>
      </tr>
    ));
  };

  const swr = useSWR("/order/customers");
  const customers: CustomerInterface[] = swr.data;
  const error = swr.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }
  if (!customers) {
    return <Loader />;
  }

  return (
    <div className="container">
      <PageHeader>Customers</PageHeader>
      <SortableTable
        initialSortData={{
          index: 1,
          isAsc: false,
        }}
        headers={getTableHeaders()}
        data={customers}
        emptyMsg="There are no customers"
        body={renderTableBody}
      />
      <style jsx>{`
        .container {
          padding: 1em 0;
          margin: 1em auto;
          background: ${CSSConstants.foregroundColor};
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
        }
        header {
          font-size: 1.5rem;
          margin: 0.5em;
        }
        @media (max-width: 800px) {
          .container {
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Customers;
