import { OrderInterface } from "../../src/types/order";
import CSSConstants from "../../src/constants/CSSConstants";
import Select from "../../src/components/Select";
import { PaginatedDataInterface } from "../../src/types/pagination";
import PageHeader from "../../src/components/PageHeader";
import { SelectOptionInterface } from "../../src/types/product";
import useSWR from "swr";
import { BusinessDataInterface } from "../../src/types/business";
import PageError from "../../src/components/PageError";
import Loader from "../../src/components/Loader";
import EcosystemOption from "../../src/components/EcosystemOption";
import WithAuth from "../../src/components/WithAuth";
import { useState } from "react";
import _ from "lodash";
import OrdersContainer from "../../src/components/OrdersContainer";

const Orders = () => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [selectedEcosystemId, setSelectedEcosystemId] = useState(null);
  const orderSWR = useSWR(
    selectedEcosystemId
      ? `/order?pageNumber=${currentPageNumber}&ecosystemids=${selectedEcosystemId}`
      : `/order?pageNumber=${currentPageNumber}`
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
      value: null,
      label: "All Ecosystems",
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
    <div className="container">
      <div className="headerContainer">
        <PageHeader>Orders</PageHeader>
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
      <OrdersContainer
        orderData={orderData}
        setCurrentPageNumber={setCurrentPageNumber}
        selectedEcosystemId={selectedEcosystemId}
      />
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
