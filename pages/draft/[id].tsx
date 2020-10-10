import { DraftResponseInterface } from "types/draft";
import useSWR from "swr";
import Loader from "components/atoms/Loader";
import SkuTable from "components/molecules/SkuTable";
import { useRouter } from "next/router";
import Specification from "components/molecules/Specification";
import TierPrice from "components/molecules/TierPrice";
import FAQ from "components/molecules/FAQ";
import CSSConstants from "../../src/constants/CSSConstants";
import PageError from "components/atoms/PageError";
import WithAuth from "components/atoms/WithAuth";
import ProductMainInfo from "components/molecules/ProductMainInfo";
import ProductPriceDetails from "components/molecules/ProductPriceDetails";
import { Box, Heading, Stack } from "@chakra-ui/core";

const Draft = () => {
  const router = useRouter();
  const draftSWR = useSWR(`/product/draft/${router.query.id}`);

  const draft: DraftResponseInterface = draftSWR.data;
  const error = draftSWR.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!draft) {
    return <Loader />;
  }

  return (
    <Box p={2}>
      <Heading size="md" my={5} textTransform="uppercase">
        <Box as="span">Draft #{draft.id}</Box>
        <Box
          as="span"
          borderRadius={2}
          display="inline-block"
          background="primaryColor"
          px={4}
          py={2}
          color="white"
          my={3}
          textTransform="initial"
        >
          {draft.status}
        </Box>
      </Heading>
      <Stack spacing={3}>
        <Box>
          <ProductMainInfo
            name={draft.name}
            brand={draft.brandName}
            shortDescription={draft.shortDescription}
            longDescription={draft.longDescription}
          />
        </Box>
        <Box>
          <ProductPriceDetails
            minPrice={draft.minPrice}
            maxPrice={draft.maxPrice}
          />
        </Box>
        <SkuTable
          attributeValues={draft.attributeValues}
          skus={draft.skuDetails}
        />
        <Specification specification={draft.specification} />
        <TierPrice tierPrice={draft.tierPrice} />
        <FAQ faqs={draft.faqs} />
      </Stack>
    </Box>
  );
};

export default WithAuth(Draft);
