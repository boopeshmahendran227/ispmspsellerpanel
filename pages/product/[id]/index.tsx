import useSWR from "swr";
import Loader from "../../../src/components/Loader";
import PageError from "../../../src/components/PageError";
import PageHeader from "../../../src/components/PageHeader";
import WithAuth from "../../../src/components/WithAuth";
import { useRouter } from "next/router";
import SkuMiniTable from "../../../src/components/SkuMiniTable";
import ProductMainInfo from "../../../src/components/ProductMainInfo";
import ProductPriceDetails from "../../../src/components/ProductPriceDetails";
import Specification from "../../../src/components/Specification";
import TierPrice from "../../../src/components/TierPrice";
import FAQ from "../../../src/components/FAQ";

const Product = () => {
  const router = useRouter();
  const swr = useSWR(`/product/${router.query.id}`);
  const product = swr.data;

  const error = swr.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!product) {
    return <Loader />;
  }

  return (
    <div className="container">
      <PageHeader>{product.name}</PageHeader>
      <ProductMainInfo
        name={product.name}
        brand={product.brandName}
        shortDescription={product.shortDescription}
        longDescription={product.longDescription}
      />
      <ProductPriceDetails
        minPrice={product.minPrice}
        maxPrice={product.maxPrice}
        specialDiscount={product.specialDiscount}
      />
      <SkuMiniTable skus={product.skuDetails} productId={product.id} />
      {/* <Specification specification={product.specification} /> */}
      <TierPrice tierPrice={product.tierPrice} />
      <FAQ faqs={product.faqs} />
    </div>
  );
};

export default WithAuth(Product);
