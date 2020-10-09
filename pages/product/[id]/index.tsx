import useSWR from "swr";
import Loader from "components/atoms/Loader";
import PageError from"../../../src/components/atoms/PageError";
import PageHeader from "../../../src/components/atoms/PageHeader";
import WithAuth from "components/atoms/WithAuth";
import { useRouter } from "next/router";
import ProductMainInfo from "components/ProductMainInfo";
import ProductPriceDetails from "components/ProductPriceDetails";
import ProductAvailability from "components/ProductAvailability";
import TierPrice from "components/TierPrice";
import FAQ from "components/FAQ";
import styled from "styled-components";
import BackLink from "components/atoms/BackLink";
import { ProductDetailInterface, TierPriceInterface } from "types/product";
import YourSkuTable from "components/YourSkuTable";
import OtherSkusTable from "components/OtherSkusTable";
import TierPriceInput from "components/TierpriceInput";
import { Formik, Form } from "formik";
import SectionCard from "components/SectionCard";
import Button from "components/atoms/Button";
import * as Yup from "yup";
import ProductActions from "actions/product";
import { connect } from "react-redux";
import{Box}from "@chakra-ui/core";

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

interface DispatchProps {
  updateTierPrice: (
    productId: number,
    tierPrices: TierPriceInterface[]
  ) => void;
}

type ProductProps = DispatchProps;

const validationSchema = Yup.object()
  .shape({
    tierPrices: Yup.array()
      .of(
        Yup.object()
          .shape({
            minQty: Yup.number()
              .defined()
              .positive("Minimum Qty must be lesser than 0"),
            discountPercentage: Yup.number()
              .defined()
              .min(1, "Discount Percentage must be greater than 1")
              .max(100, "Discount Percentage should be less than 100"),
          })
          .defined()
      )
      .defined(),
  })
  .defined();

type InputInterface = Yup.InferType<typeof validationSchema>;

const Product = (props: ProductProps) => {
  const router = useRouter();
  const productId = Number(router.query.id);
  const swr = useSWR(`/product/seller/${productId}`);
  const product: ProductDetailInterface = swr.data;

  const error = swr.error;

  const onSubmit = (values: InputInterface) => {
    props.updateTierPrice(productId, values.tierPrices);
  };

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!product) {
    return <Loader />;
  }

  return (
    <Box maxW="900px" margin="auto">
      <Box m="2em 0">
        <BackLink href="/product">Products</BackLink>
        <PageHeader>{product.name}</PageHeader>
      </Box>
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
          />
          <SectionCard>
            <Formik
              initialValues={{
                tierPrices: product.tierPrice,
              }}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {() => (
                <Form>
                  <TierPriceInput />
                  <Button isSubmitButton={true}>SAVE</Button>
                </Form>
              )}
            </Formik>
          </SectionCard>
          <YourSkuTable skus={product.skuDetails} productId={product.id} />
          <OtherSkusTable
            skus={product.unOwnedSkuDetails}
            productId={product.id}
          />
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
    </Box>
  );
};

const mapDispatchToProps: DispatchProps = {
  updateTierPrice: ProductActions.updateTierPrice,
};

export default WithAuth(
  connect<null, DispatchProps>(null, mapDispatchToProps)(Product)
);
