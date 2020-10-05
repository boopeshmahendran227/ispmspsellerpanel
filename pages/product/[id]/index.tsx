import useSWR from "swr";
import Loader from "components/atoms/Loader";
import PageError from "components/atoms/PageError";
import PageHeader from "components/atoms/PageHeader";
import WithAuth from "components/atoms/WithAuth";
import { useRouter } from "next/router";
import ProductMainInfo from "components/molecules/ProductMainInfo";
import ProductPriceDetails from "components/molecules/ProductPriceDetails";
import ProductAvailability from "components/molecules/ProductAvailability";
import Specification from "components/molecules/Specification";
import TierPrice from "components/atoms/TierPrice";
import FAQ from "components/molecules/FAQ";
import BackLink from "components/atoms/BackLink";
import { ProductDetailInterface } from "types/product";
import YourSkuTable from "components/organism/YourSkuTable";
import OtherSkusTable from "components/molecules/OtherSkusTable";
import { Box, Grid, Stack, Flex } from "@chakra-ui/core";

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
    <Box maxW="900px" margin="auto">
      <Box m="2em 0">
        <BackLink href="/product">Products</BackLink>
        <PageHeader>{product.name}</PageHeader>
      </Box>

      <Grid templateColumns="2fr 1fr" gap="1.5em">
        <Stack spacing={5}>
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
            <YourSkuTable skus={product.skuDetails} productId={product.id} />
          </Box>
          <Box>
            <OtherSkusTable
              skus={product.unOwnedSkuDetails}
              productId={product.id}
            />
          </Box>
        </Stack>
        <Stack spacing={5}>
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
    </Box>
  );
};

export default WithAuth(Product);
