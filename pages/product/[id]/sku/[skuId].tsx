import { Fragment } from "react";
import useSWR from "swr";
import Loader from "components/atoms/Loader";
import PageError from "components/atoms/PageError";
import PageHeader from "components/atoms/PageHeader";
import WithAuth from "components/atoms/WithAuth";
import { useRouter } from "next/router";
import SkuList from "components/molecules/SkuList";
import { Formik, Form } from "formik";
import SkuProductInfo from "components/atoms/SkuProductInfo";
import BackLink from "components/atoms/BackLink";
import SectionHeader from "components/atoms/SectionHeader";
import SectionCard from "components/atoms/SectionCard";
import ImageUploader from "components/molecules/ImageUploader";
import { ProductDetailInterface } from "types/product";
import _ from "lodash";
import FieldSelect from "components/molecules/FieldSelect";
import FieldEcosystemMultiInput from "components/molecules/FieldEcosystemMultiInput";
import { EcosystemResponseInterface } from "types/business";
import { connect } from "react-redux";
import SkuActions from "actions/sku";
import { UpdateSkuInterface } from "types/sku";
import Button from "components/atoms/Button";
import * as Yup from "yup";
import styled from "styled-components";
import SkuDimensionsInputContainer from "components/molecules/SkuDimensionsInputContainer";
import SkuInventoryInputContainer from "components/molecules/SkuInventoryInputContainer";
import SkuPricingInputContainer from "components/molecules/SkuPricingInputContainer";
import { Box,Text } from "@chakra-ui/core";

interface DispatchProps {
  updateSku: (sku: UpdateSkuInterface) => void;
}

type SkuProps = DispatchProps;

const validationSchema = Yup.object({
  skuDetailId: Yup.number().required().defined(),
  price: Yup.number().required(),
  boughtPrice: Yup.number().required(),
  qty: Yup.number().required(),
  barcodeIdentifier: Yup.string().nullable().notRequired(),
  externalId: Yup.string().nullable().notRequired(),
  length: Yup.number().nullable().defined(),
  width: Yup.number().nullable().defined(),
  height: Yup.number().nullable().defined(),
  weight: Yup.number().nullable().defined(),
  ecosystemIds: Yup.array()
    .of(Yup.string().defined())
    .min(1, "Atleast one ecosystem is required"),
}).defined();

type InputInterface = Yup.InferType<typeof validationSchema>;

const FlexRowContainer = styled.div`
  display: flex;

  & > div {
    margin-right: 0.6em;
  }
`;

const FlexColumnContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    margin-bottom: 1.5em;
  }
`;

const Sku = (props: SkuProps): JSX.Element => {
  const router = useRouter();
  const productSWR = useSWR(`/product/seller/${router.query.id}`);
  const businessSWR = useSWR("/businesses/ecosystems/all");

  const currentSkuId: string = router.query.skuId as string;
  const product: ProductDetailInterface = productSWR.data;
  const ecosystemData: EcosystemResponseInterface = businessSWR.data;

  const error = productSWR.error || businessSWR.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!product || !ecosystemData) {
    return <Loader />;
  }

  const currentSku = product.skuDetails.find(
    (sku) => sku.skuId === currentSkuId
  );

  if (!currentSku) {
    return <PageError statusCode={404} />;
  }

  const attributes = product.attributeValues;

  const handleSubmit = (values: InputInterface) => {
    props.updateSku(values);
  };

  return (
    <Box maxW="900px" m="auto">
      <Box m="1.3rem 0">
        <BackLink href="/product/[id]" as={`/product/${product.id}`}>
          Back to Product
        </BackLink>
        <PageHeader>{currentSkuId}</PageHeader>
      </Box>
      <FlexRowContainer>
        <Box>
          <SkuProductInfo
            productId={product.id}
            productName={product.name}
            image={product.skuDetails[0].imageRelativePaths[0]}
          />
          <SkuList
            productId={product.id}
            skus={product.skuDetails}
            currentSkuId={currentSkuId}
          />
        </Box>
        <Box flex="1" mb="1em" ml="1em">
          <Formik
            initialValues={{
              skuDetailId: currentSku.skuDetailId,
              price: currentSku.price,
              boughtPrice: currentSku.boughtPrice,
              qty: currentSku.qty,
              barcodeIdentifier: currentSku.barCodeIdentifier,
              externalId: currentSku.externalId,
              length: currentSku.length,
              width: currentSku.width,
              height: currentSku.height,
              weight: currentSku.weight,
              ecosystemIds: currentSku.ecosystemIds,
              attributes: attributes.map((attribute) => ({
                attributeId: attribute.attributeId,
                attributeName: attribute.attributeName,
                value: {
                  value:
                    currentSku.attributeValueIds.find(
                      (attrVaueId) =>
                        attrVaueId.attributeId === attribute.attributeId
                    )?.valueId || attribute.attributeValues[0].valueId,
                  label:
                    currentSku.attributeValueIds.find(
                      (attrVaueId) =>
                        attrVaueId.attributeId === attribute.attributeId
                    )?.value || attribute.attributeValues[0].value,
                },
              })),
            }}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <FlexColumnContainer>
                  <SectionCard>
                    <SectionHeader>Options</SectionHeader>
                    {attributes.map((attribute, index) => (
                      <Fragment key={index}>
                        <label>{attribute.attributeName}</label>
                        <FieldSelect
                          disabled={true}
                          name={`attributes.${index}.value`}
                          options={attribute.attributeValues.map((value) => ({
                            value: value.valueId,
                            label: value.value,
                          }))}
                        />
                      </Fragment>
                    ))}
                  </SectionCard>
                  {/* <ImageUploader /> */}
                  <SkuPricingInputContainer />
                  <SkuInventoryInputContainer />
                  <SectionCard>
                    <SectionHeader>Visibility</SectionHeader>
                    <Text mt="0.3em" display="inline-block">
                      Ecosystem
                    </Text>
                    <FieldEcosystemMultiInput
                      name="ecosystemIds"
                      ecosystemData={ecosystemData}
                    />
                  </SectionCard>
                  <SkuDimensionsInputContainer />
                </FlexColumnContainer>
                <Button isSubmitButton={true}>Save</Button>
              </Form>
            )}
          </Formik>
        </Box>
      </FlexRowContainer>
      <style jsx>{`
        .flexContainer {
          display: flex;
        }
      `}</style>
    </Box>
  );
};

const mapDispatchToProps: DispatchProps = {
  updateSku: SkuActions.updateSku,
};

export default WithAuth(
  connect<null, DispatchProps>(null, mapDispatchToProps)(Sku)
);
