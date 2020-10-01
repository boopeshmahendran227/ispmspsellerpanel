import { DraftResponseInterface } from "types/draft";
import useSWR from "swr";
import Loader from "components/atoms/Loader";
import SkuTable from "components/SkuTable";
import { useRouter } from "next/router";
import Specification from "components/Specification";
import TierPrice from "components/TierPrice";
import FAQ from "components/FAQ";
import CSSConstants from "../../src/constants/CSSConstants";
import PageError from "components/atoms/PageError";
import WithAuth from "components/WithAuth";
import ProductMainInfo from "components/ProductMainInfo";
import ProductPriceDetails from "components/ProductPriceDetails";
import styled from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    margin-bottom: 1.5em;
  }
`;

const Draft = () => {
  const router = useRouter();
  const draftSWR = useSWR(`/product/draft/${router.query.id}`);

  const draft: DraftResponseInterface = draftSWR.data;
  const error = draftSWR.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!draft) {
    return <Loader />;
  }

  return (
    <div className="container">
      <header>
        <span className="name">Draft #{draft.id}</span>
        <span className="status">{draft.status}</span>
      </header>
      <FlexContainer>
        <ProductMainInfo
          name={draft.name}
          brand={draft.brandName}
          shortDescription={draft.shortDescription}
          longDescription={draft.longDescription}
        />
        <ProductPriceDetails
          minPrice={draft.minPrice}
          maxPrice={draft.maxPrice}
          specialDiscount={draft.specialDiscount}
        />
        <SkuTable
          attributeValues={draft.attributeValues}
          skus={draft.skuDetails}
        />
        <Specification specification={draft.specification} />
        <TierPrice tierPrice={draft.tierPrice} />
        <FAQ faqs={draft.faqs} />
      </FlexContainer>
      <style jsx>{`
        .container {
          padding: 0.8em;
        }
        header {
          font-size: 1.4rem;
          margin: 0.7em 0;
          text-transform: uppercase;
        }
        .status {
          border-radius: 2em;
          display: inline-block;
          background: ${CSSConstants.primaryColor};
          padding: 0.2em 0.5em;
          color: white;
          margin: 0 0.3em;
          font-size: 1rem;
          text-transform: initial;
        }
      `}</style>
    </div>
  );
};

export default WithAuth(Draft);
