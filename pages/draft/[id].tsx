import { ProductResponseInterface } from "../../src/types/product";
import useSWR from "swr";
import Error from "next/error";
import Loader from "../../src/components/Loader";
import SkuTable from "../../src/components/SkuTable";
import { useRouter } from "next/router";
import Specification from "../../src/components/Specification";
import TierPrice from "../../src/components/TierPrice";
import FAQ from "../../src/components/FAQ";
import { formatPrice } from "../../src/utils/misc";

const Draft = () => {
  const router = useRouter();
  const draftSWR = useSWR(`/product/draft/${router.query.id}`);

  const draft: ProductResponseInterface = draftSWR.data;

  if (draftSWR.error) {
    return <Error title="Unexpected error occured" statusCode={500} />;
  }

  if (!draft) {
    return <Loader />;
  }

  return (
    <div className="container">
      <header>{draft.name}</header>
      <div className="body">
        <div className="gridContainer">
          <div className="key">Product Type</div>
          <div className="value">{draft.productType}</div>
          <div className="key">Brand</div>
          <div className="value">{draft.brandName}</div>
          <div className="key">Short Description</div>
          <div className="value">{draft.shortDescription}</div>
          <div className="key">Long Description</div>
          <div className="value">{draft.longDescription}</div>
          <div className="key">Min Price</div>
          <div className="value">{formatPrice(draft.minPrice)}</div>
          <div className="key">Max Price</div>
          <div className="value">{formatPrice(draft.maxPrice)}</div>
          <div className="key">Special Discount</div>
          <div className="value">{formatPrice(draft.specialDiscount)}</div>
        </div>
        <SkuTable skus={draft.skuDetails} />
        <Specification specification={draft.specification} />
        <TierPrice tierPrice={draft.tierPrice} />
        <FAQ faqs={draft.faqs} />
      </div>
      <style jsx>{`
        .container {
          padding: 0 1em;
        }
        header {
          font-size: 1.4rem;
          margin: 1em 0;
          text-transform: uppercase;
        }
        .gridContainer {
          display: grid;
          grid-template-columns: 200px 500px;
          grid-row-gap: 0.3em;
          align-items: center;
          font-size: 1.1rem;
        }
        .key {
          font-weight: bold;
        }
        .body {
          margin: 1em 2em;
        }
      `}</style>
    </div>
  );
};

export default Draft;
