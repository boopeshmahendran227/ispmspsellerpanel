import { OrderInterface } from "types/order";
import CSSConstants from "../../src/constants/CSSConstants";
import Select from "components/Select";
import { PaginatedDataInterface } from "types/pagination";
import PageHeader from "components/PageHeader";
import { SelectOptionInterface } from "types/product";
import useSWR from "swr";
import { BusinessDataInterface } from "types/business";
import PageError from "components/PageError";
import Loader from "components/Loader";
import EcosystemOption from "components/atoms/EcosystemOption";
import WithAuth from "components/WithAuth";
import { useState } from "react";
import _ from "lodash";
import OrdersContainer from "components/OrdersContainer";

const Orders = () => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [selectedEcosystemId, setSelectedEcosystemId] = useState("");
  const orderSWR = useSWR(
    `/order?pageNumber=${currentPageNumber}&ecosystemids=${selectedEcosystemId}`
  );

  const orderData: PaginatedDataInterface<OrderInterface> = orderSWR.data;

  const businessSWR = useSWR("/businesses/business");
  const businessData: BusinessDataInterface = businessSWR.data;
  const error = businessSWR.error || orderSWR.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!businessData) {
    return <Loader />;
  }

  const ecosystems: SelectOptionInterface[] = [
    {
      value: "",
      label: "All Ecosystems",
    },
    {
      value: "Default",
      label: "Istakapaza Default Marketplace",
    },
    ...businessData.ecosystems.map((ecosystem) => ({
      value: ecosystem.ecosystem_id._id,
      label: <EcosystemOption ecosystem={ecosystem} />,
    })),
  ];

  const currentEcosystem = ecosystems.find(
    (ecosystem) => ecosystem.value === selectedEcosystemId
  );

  return (
    <div>
      <div className="headerContainer">
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
      </div>
      <div className="container">
        <OrdersContainer
          orderData={orderData}
          setCurrentPageNumber={setCurrentPageNumber}
          selectedEcosystemId={selectedEcosystemId}
        />
      </div>
      <style jsx>{`
        .container {
          padding: 1em 0;
          margin: 1em auto;
          font-size: 0.9rem;
          background: ${CSSConstants.foregroundColor};
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
        }
        .headerContainer {
          padding: 0.6em 1.3em;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .filterContainer {
          min-width: 300px;
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

export default WithAuth(Orders);
