import SortableTable from "components/atoms/SortableTable";
import useSWR from "swr";
import Loader from "components/atoms/Loader";
import PageError from "components/atoms/PageError";
import PageHeader from "components/atoms/PageHeader";
import { CustomerInterface } from "types/customer";
import WithAuth from "components/atoms/WithAuth";
import PageContainer from "components/atoms/PageContainer";
import PageHeaderContainer from "components/atoms/PageHeaderContainer";

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
    return customers.map((customer, index) => (
      <tr key={index}>
        <td>{customer.name}</td>
        <td>{customer.mobile}</td>
        <td>{customer.email}</td>
      </tr>
    ));
  };

  const swr = useSWR<CustomerInterface[]>("/order/customers");
  const customers: CustomerInterface[] | undefined = swr.data;
  const error = swr.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!customers) {
    return <Loader />;
  }

  return (
    <PageContainer>
      <PageHeaderContainer>
        <PageHeader>Customers</PageHeader>
      </PageHeaderContainer>
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
    </PageContainer>
  );
};

export default WithAuth(Customers);
