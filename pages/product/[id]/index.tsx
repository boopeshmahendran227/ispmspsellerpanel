import useSWR from "swr";
import Loader from "components/atoms/Loader";
import PageError from "../../../src/components/atoms/PageError";
import PageHeader from "../../../src/components/atoms/PageHeader";
import WithAuth from "components/atoms/WithAuth";
import { useRouter } from "next/router";
import ProductMainInfo from "../../../src/components/molecules/ProductMainInfo";
import ProductPriceDetails from "../../../src/components/molecules/ProductPriceDetails";
import ProductAvailability from "../../../src/components/molecules/ProductAvailability";
import TierPrice from "../../../src/components/molecules/TierPrice";
import FAQ from "../../../src/components/molecules/FAQ";
import styled from "styled-components";
import BackLink from "components/atoms/BackLink";
import { ProductDetailInterface, TierPriceInterface } from "types/product";
import YourSkuTable from "../../../src/components/organism/YourSkuTable";
import OtherSkusTable from "../../../src/components/molecules/OtherSkusTable";
import TierPriceInput from "../../../src/components/molecules/TierpriceInput";
import { Formik, Form } from "formik";
import SectionCard from "../../../src/components/atoms/SectionCard";
import Button from "components/atoms/Button";
import * as Yup from "yup";
import ProductActions from "actions/product";
import { connect } from "react-redux";
import { Box, Grid, Stack } from "@chakra-ui/core";

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
      <Grid templateColumns="2fr 1fr" gridGap="1.5em">
        <Stack spacing={3}>
          <Box>
            <ProductMainInfo
              name={product.name}
              brand={product.brandName}
              shortDescription={product.shortDescription}
              longDescription={product.longDescription}
            />
          </Box>
          <Box>
            <ProductPriceDetails
              minPrice={product.minPrice}
              maxPrice={product.maxPrice}
            />
          </Box>
          <Box>
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
          </Box>
          <Box>
            <YourSkuTable skus={product.skuDetails} productId={product.id} />
          </Box>
          <Box>
            <OtherSkusTable
              skus={product.unOwnedSkuDetails}
              productId={product.id}
            />
          </Box>
        </Stack>
        <Stack>
          <ProductAvailability
            ecosystems={product.visibilityInfo.ecosystemDetail}
          />
          <TierPrice tierPrice={product.tierPrice} />
          <FAQ faqs={product.faqs} />
        </Stack>
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
