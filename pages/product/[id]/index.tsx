import useSWR from "swr";
import Loader from "components/atoms/Loader";
import PageError from "components/atoms/PageError";
import PageHeader from "components/atoms/PageHeader";
import WithAuth from "components/atoms/WithAuth";
import { useRouter } from "next/router";
import ProductMainInfo from "components/molecules/ProductMainInfo";
import ProductPriceDetails from "components/molecules/ProductPriceDetails";
import ProductAvailability from "components/molecules/ProductAvailability";
import TierPrice from "components/molecules/TierPrice";
import FAQ from "components/molecules/FAQ";
import BackLink from "components/atoms/BackLink";
import { ProductDetailInterface, TierPriceInterface } from "types/product";
import YourSkuTable from "components/organism/YourSkuTable";
import OtherSkusTable from "components/molecules/OtherSkusTable";
import TierPriceInput from "components/molecules/TierpriceInput";
import { Formik, Form } from "formik";
import SectionCard from "components/atoms/SectionCard";
import * as Yup from "yup";
import ProductActions from "actions/product";
import { connect } from "react-redux";
import { Box, SimpleGrid, Stack, Heading, Grid } from "@chakra-ui/core";
import Button from "components/atoms/Button";

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
    <Stack maxW="900px" mx={[2, "auto"]} p={[1, 3]} spacing={2}>
      <Box my={3}>
        <BackLink href="/product">Products</BackLink>
        <Heading size="md">{product.name}</Heading>
      </Box>
      <Grid templateColumns={["1fr", null, null, "1fr 300px"]} gap={2} my={5}>
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
                    <Button type="submit">SAVE</Button>
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
        <Stack spacing={3}>
          <Box>
            <ProductAvailability
              ecosystems={product.visibilityInfo.ecosystemDetail}
            />
          </Box>
          <Box>
            <TierPrice tierPrice={product.tierPrice} />
          </Box>
          <Box>
            <FAQ faqs={product.faqs} />
          </Box>
        </Stack>
      </Grid>
      {/* <Specification specification={product.specification} /> */}
    </Stack>
  );
};

const mapDispatchToProps: DispatchProps = {
  updateTierPrice: ProductActions.updateTierPrice,
};

export default WithAuth(
  connect<null, DispatchProps>(null, mapDispatchToProps)(Product)
);
