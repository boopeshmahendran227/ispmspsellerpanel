import useSWR from "swr";
import Loader from "../../../../src/components/Loader";
import PageError from "../../../../src/components/PageError";
import PageHeader from "../../../../src/components/PageHeader";
import WithAuth from "../../../../src/components/WithAuth";
import { useRouter } from "next/router";
import SkuList from "../../../../src/components/SkuList";

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
      <SkuList productId={product.id} skus={product.skuDetails} />
    </div>
  );
};

export default WithAuth(Product);
