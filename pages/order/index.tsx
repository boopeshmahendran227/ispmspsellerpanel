import { OrderInterface } from "types/order";
import Select from "components/Select";
import { PaginatedDataInterface } from "types/pagination";
import PageHeader from "components/PageHeader";
import { SelectOptionInterface } from "types/product";
import DeliveryCodeModal from "components/DeliveryCodeModal";
import useSWR from "swr";
import {
  EcosystemDataInterface,
  EcosystemResponseInterface,
} from "types/business";
import PageError from "components/PageError";
import Loader from "components/Loader";
import EcosystemOption from "components/atoms/EcosystemOption";
import WithAuth from "components/WithAuth";
import { useState } from "react";
import _ from "lodash";
import OrdersContainer from "components/OrdersContainer";
import PageContainer from "components/atoms/PageContainer";
import PageHeaderContainer from "components/atoms/PageHeaderContainer";
import PageBodyContainer from "components/atoms/PageBodyContainer";

const Orders = () => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [selectedEcosystemId, setSelectedEcosystemId] = useState("");
  const orderSWR = useSWR(
    `/order?pageNumber=${currentPageNumber}&ecosystemids=${selectedEcosystemId}`
  );

  const orderData: PaginatedDataInterface<OrderInterface> = orderSWR.data;

  const businessSWR = useSWR("/businesses/ecosystems/all");
  const ecosystemData: EcosystemResponseInterface = businessSWR.data;
  const error = businessSWR.error || orderSWR.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!ecosystemData) {
    return <Loader />;
  }

  const ecosystems: SelectOptionInterface[] = [
    {
      value: "",
      label: "All Ecosystems",
    },
    ...ecosystemData.map((ecosystem: EcosystemDataInterface) => ({
      value: ecosystem._id,
      label: <EcosystemOption ecosystem={ecosystem} />,
    })),
  ];

  const currentEcosystem = ecosystems.find(
    (ecosystem) => ecosystem.value === selectedEcosystemId
  );

  if (!currentEcosystem) {
    return <PageError statusCode={404} />;
  }

  return (
    <PageContainer>
      {/* Modals */}
      <DeliveryCodeModal />
      <PageHeaderContainer>
        <PageHeader>Order Details</PageHeader>
        <div className="filterContainer">
          <Select
            value={currentEcosystem}
            onChange={(ecosystem) =>
              setSelectedEcosystemId(ecosystem.value as string)
            }
            options={ecosystems}
          />
        </div>
      </PageHeaderContainer>
      <PageBodyContainer>
        <OrdersContainer
          orderData={orderData}
          setCurrentPageNumber={setCurrentPageNumber}
          selectedEcosystemId={selectedEcosystemId}
        />
      </PageBodyContainer>
      <style jsx>{`
        .filterContainer {
          min-width: 300px;
        }
      `}</style>
    </PageContainer>
  );
};

export default WithAuth(Orders);
