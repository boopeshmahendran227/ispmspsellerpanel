import { DraftResponseInterface } from "types/draft";
import useSWR from "swr";
import Loader from "components/atoms/Loader";
import SkuTable from "components/molecules/SkuTable";
import { useRouter } from "next/router";
import Specification from "components/molecules/Specification";
import TierPrice from "components/molecules/TierPrice";
import FAQ from "components/molecules/FAQ";
import PageError from "components/atoms/PageError";
import WithAuth from "components/atoms/WithAuth";
import ProductMainInfo from "components/molecules/ProductMainInfo";
import ProductPriceDetails from "components/molecules/ProductPriceDetails";
import { Box, Heading, Stack, Tag } from "@chakra-ui/core";

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
    <Box py={2} px={4}>
      <Stack spacing={3} isInline alignItems="baseline">
        <Heading size="md" my={5} textTransform="uppercase">
          <Box as="span">Draft #{draft.id}</Box>
        </Heading>
        <Box>
          <Tag
            variant="solid"
            rounded="full"
            size="sm"
            variantColor="primaryColorVariant"
          >
            {draft.status}
          </Tag>
        </Box>
      </Stack>
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
        <Box>
          <SkuTable
            attributeValues={draft.attributeValues}
            skus={draft.skuDetails}
          />
        </Box>
        <Box>
          <Specification specification={draft.specification} />
        </Box>
        <Box>
          <TierPrice tierPrice={draft.tierPrice} />
        </Box>
        <Box>
          <FAQ faqs={draft.faqs} />
        </Box>
      </Stack>
    </Box>
  );
};

export default WithAuth(Draft);
