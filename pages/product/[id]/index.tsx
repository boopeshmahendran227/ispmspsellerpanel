import useSWR from "swr";
import Loader from "../../../src/components/Loader";
import PageError from "../../../src/components/PageError";
import PageHeader from "../../../src/components/PageHeader";
import WithAuth from "../../../src/components/WithAuth";
import { useRouter } from "next/router";
import SkuMiniTable from "../../../src/components/SkuMiniTable";

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
      <SkuMiniTable skus={product.skuDetails} productId={product.id} />
    </div>
  );
};

export default WithAuth(Product);
