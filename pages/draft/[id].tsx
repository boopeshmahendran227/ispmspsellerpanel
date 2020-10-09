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
    <Box p="0.8em">
      <Heading as="h6" size="md" margin="0.7em 0" textTransform="uppercase">
        <Box as="span" className="name">
          Draft #{draft.id}
        </Box>
        <Box
          as="span"
          borderRadius="2em"
          display="inline-block"
          background={CSSConstants.primaryColor}
          p="0.2em 0.5em"
          color="white"
          m="0 0.3em"
          fontSize="1rem"
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
