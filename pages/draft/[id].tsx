import { DraftResponseInterface } from "../../src/types/draft";
import useSWR from "swr";
import Loader from "../../src/components/Loader";
import SkuTable from "../../src/components/SkuTable";
import { useRouter } from "next/router";
import Specification from "../../src/components/Specification";
import TierPrice from "../../src/components/TierPrice";
import FAQ from "../../src/components/FAQ";
import CSSConstants from "../../src/constants/CSSConstants";
import PageError from "../../src/components/PageError";
import WithAuth from "../../src/components/WithAuth";
import ProductMainInfo from "../../src/components/ProductMainInfo";
import ProductPriceDetails from "../../src/components/ProductPriceDetails";

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
      <div>
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
      </div>
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
