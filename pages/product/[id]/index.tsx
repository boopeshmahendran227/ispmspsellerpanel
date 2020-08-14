import useSWR from "swr";
import Loader from "components/Loader";
import PageError from "components/PageError";
import PageHeader from "components/PageHeader";
import WithAuth from "components/WithAuth";
import { useRouter } from "next/router";
import ProductMainInfo from "components/ProductMainInfo";
import ProductPriceDetails from "components/ProductPriceDetails";
import ProductAvailability from "components/ProductAvailability";
import Specification from "components/Specification";
import TierPrice from "components/TierPrice";
import FAQ from "components/FAQ";
import styled from "styled-components";
import BackLink from "components/atoms/BackLink";
import { ProductDetailInterface } from "types/product";
import YourSkuTable from "components/YourSkuTable";
import OtherSkusTable from "components/OtherSkusTable";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 1.5em;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    margin-bottom: 1.5em;
  }
`;

const Container = styled.div`
  max-width: 900px;
  margin: auto;
`;

const HeaderContainer = styled.div`
  margin: 2em 0;
`;

const Product = () => {
  const router = useRouter();
  const swr = useSWR(`/product/seller/${router.query.id}`);
  const product: ProductDetailInterface = swr.data;

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
        <BackLink href="/product">Products</BackLink>
        <PageHeader>{product.name}</PageHeader>
      </HeaderContainer>
      <Grid>
        <FlexContainer>
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
          <YourSkuTable skus={product.skuDetails} productId={product.id} />
          <OtherSkusTable skus={product.unOwnedSkuDetails} />
        </FlexContainer>
        <FlexContainer>
          <ProductAvailability
            ecosystems={product.visibilityInfo.ecosystemDetail}
          />
          <TierPrice tierPrice={product.tierPrice} />
          <FAQ faqs={product.faqs} />
        </FlexContainer>
      </Grid>
      {/* <Specification specification={product.specification} /> */}
    </Container>
  );
};

export default WithAuth(Product);
