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
import styled from "styled-components";

const Container = styled.div`
  max-width: 700px;
  margin: auto;
`;

const HeaderContainer = styled.div`
  margin: 2em 0;
`;

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
    <Container>
      <HeaderContainer>
        <PageHeader>{product.name}</PageHeader>
      </HeaderContainer>
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
    </Container>
  );
};

export default WithAuth(Product);
