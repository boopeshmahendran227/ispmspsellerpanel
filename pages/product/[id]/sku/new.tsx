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
import _ from "lodash";
import { ProductDetailInterface } from "types/product";
import FieldSelect from "components/molecules/FieldSelect";
import { AddSkuInterface } from "types/sku";
import * as Yup from "yup";
import { connect } from "react-redux";
import SkuActions from "actions/sku";
import FieldEcosystemMultiInput from "components/molecules/FieldEcosystemMultiInput";
import FieldInput from "components/atoms/FieldInput";
import { EcosystemResponseInterface } from "types/business";
import SkuDimensionsInputContainer from "components/molecules/SkuDimensionsInputContainer";
import SkuInventoryInputContainer from "components/molecules/SkuInventoryInputContainer";
import SkuPricingInputContainer from "components/molecules/SkuPricingInputContainer";
import React from "react";
import FieldNumInput from "components/atoms/FieldNumInput";
import FieldPercentageInput from "components/atoms/FieldPercentageInput";
import { Box, Grid, FormLabel, Stack, Button } from "@chakra-ui/core";

interface DispatchProps {
  addSku: (sku: AddSkuInterface) => void;
}

type SkuProps = DispatchProps;

const validationSchema = Yup.object({
  specialDiscount: Yup.number(),
  specialDiscountPercentage: Yup.number().max(100),
  skuId: Yup.string().required(),
  price: Yup.number().required(),
  boughtPrice: Yup.number().required(),
  qty: Yup.number().required(),
  barcodeIdentifier: Yup.string().nullable(),
  externalId: Yup.string().nullable().defined(),
  length: Yup.number().nullable().defined(),
  width: Yup.number().nullable().defined(),
  height: Yup.number().nullable().defined(),
  weight: Yup.number().nullable().defined(),
  minOrderQty: Yup.number().nullable().defined(),
  attributes: Yup.array()
    .of(
      Yup.object({
        attributeId: Yup.number().defined(),
        attributeName: Yup.string().defined(),
        value: Yup.object({
          value: Yup.number().defined(),
          label: Yup.string().defined(),
        }).defined(),
      }).defined()
    )
    .defined(),
  ecosystemIds: Yup.array()
    .of(Yup.string().defined())
    .min(1, "Atleast one ecosystem is required"),
}).defined();

type InputInterface = Yup.InferType<typeof validationSchema>;

const Sku = (props: SkuProps) => {
  const router = useRouter();
  const productSWR = useSWR(`/product/seller/${router.query.id}`);
  const businessSWR = useSWR(`/businesses/ecosystems/all`);

  const skuIdToCopyFrom: string = router.query.copySkuId as string;
  const product: ProductDetailInterface = productSWR.data;
  const ecosystemData: EcosystemResponseInterface = businessSWR.data;

  const error = productSWR.error || businessSWR.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!product || !ecosystemData) {
    return <Loader />;
  }

  const skuToCopyFrom = product.unOwnedSkuDetails.find(
    (sku) => sku.skuId === skuIdToCopyFrom
  );

  if (skuIdToCopyFrom && !skuToCopyFrom) {
    return <PageError statusCode={404} />;
  }

  const attributes = product.attributeValues;

  const handleSubmit = (values: InputInterface) => {
    props.addSku({
      ...values,
      productId: product.id,
      imageRelativePaths: [],
      attributeValueIds: values.attributes.map((attribute) => ({
        attributeId: attribute.attributeId,
        attributeName: attribute.attributeName,
        valueId: attribute.value.value,
        value: attribute.value.label,
      })),
    });
  };

  return (
    <Box maxW="900px" m="auto">
      <Box my={3}>
        <BackLink href="/product/[id]" as={`/product/${product.id}`}>
          Back to Product
        </BackLink>
        <PageHeader>Add New Variant</PageHeader>
      </Box>
      <Stack direction="row" spacing={3}>
        <Box>
          <SkuProductInfo
            productId={product.id}
            productName={product.name}
            image={
              product.skuDetails[0]?.imageRelativePaths[0] ||
              product.unOwnedSkuDetails[0]?.imageRelativePaths[0]
            }
          />
          <SkuList productId={product.id} skus={product.skuDetails} />
        </Box>
        <Box flex={1} mb={3} ml={3}>
          <Formik
            initialValues={
              skuToCopyFrom
                ? {
                    skuId: skuToCopyFrom.skuId,
                    price: skuToCopyFrom.price,
                    boughtPrice: skuToCopyFrom.boughtPrice,
                    qty: skuToCopyFrom.qty,
                    barcodeIdentifier: skuToCopyFrom.barCodeIdentifier,
                    externalId: skuToCopyFrom.externalId,
                    length: skuToCopyFrom.length,
                    width: skuToCopyFrom.width,
                    height: skuToCopyFrom.height,
                    weight: skuToCopyFrom.weight,
                    ecosystemIds: skuToCopyFrom.ecosystemIds,
                    specialDiscount: skuToCopyFrom.specialDiscount,
                    specialDiscountPercentage:
                      skuToCopyFrom.specialDiscountPercentage,
                    minOrderQty: skuToCopyFrom.minOrderQty,
                    attributes: attributes.map((attribute) => ({
                      attributeId: attribute.attributeId,
                      attributeName: attribute.attributeName,
                      value: {
                        value:
                          skuToCopyFrom.attributeValueIds.find(
                            (attrVaueId) =>
                              attrVaueId.attributeId === attribute.attributeId
                          )?.valueId || attribute.attributeValues[0].valueId,
                        label:
                          skuToCopyFrom.attributeValueIds.find(
                            (attrVaueId) =>
                              attrVaueId.attributeId === attribute.attributeId
                          )?.value || attribute.attributeValues[0].value,
                      },
                    })),
                  }
                : {
                    skuId: "",
                    price: 0,
                    boughtPrice: 0,
                    qty: 0,
                    barcodeIdentifier: null,
                    externalId: null,
                    length: null,
                    width: null,
                    height: null,
                    weight: null,
                    ecosystemIds: [],
                    specialDiscount: 0,
                    specialDiscountPercentage: 0,
                    minOrderQty: 1,
                    attributes: attributes.map((attribute) => ({
                      attributeId: attribute.attributeId,
                      attributeName: attribute.attributeName,
                      value: {
                        value: attribute.attributeValues[0].valueId,
                        label: attribute.attributeValues[0].value,
                      },
                    })),
                  }
            }
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors }) => (
              <Form>
                <Stack spacing={5}>
                  <Box>
                    <SectionCard>
                      <SectionHeader>Sku Details</SectionHeader>
                      <Box>
                        <FormLabel>Sku Id</FormLabel>
                        <FieldInput name="skuId" />
                      </Box>
                    </SectionCard>
                  </Box>
                  <Box>
                    <SectionCard>
                      <SectionHeader>Options</SectionHeader>
                      {attributes.map((attribute, index) => (
                        <>
                          <FormLabel>{attribute.attributeName}</FormLabel>
                          <FieldSelect
                            name={`attributes.${index}.value`}
                            options={attribute.attributeValues.map((value) => ({
                              value: value.valueId,
                              label: value.value,
                            }))}
                          />
                        </>
                      ))}
                    </SectionCard>
                  </Box>
                  <Box>
                    <SkuPricingInputContainer />
                  </Box>
                  <Box>
                    <SectionCard>
                      <SectionHeader>Special Discount</SectionHeader>
                      <Grid templateColumns="1fr 1fr" gap={2}>
                        <Box>
                          <FormLabel>Special Discount Price</FormLabel>
                          <FieldNumInput name="specialDiscount" />
                        </Box>
                        <Box>
                          <FormLabel>Special Discount Percentage</FormLabel>
                          <FieldPercentageInput name="specialDiscountPercentage" />
                        </Box>
                      </Grid>
                    </SectionCard>
                  </Box>
                  <Box>
                    <SkuInventoryInputContainer />
                    <SectionCard>
                      <SectionHeader>Visibility</SectionHeader>
                      <FormLabel>Ecosystem</FormLabel>
                      <FieldEcosystemMultiInput
                        name="ecosystemIds"
                        ecosystemData={ecosystemData}
                      />
                    </SectionCard>
                  </Box>
                  <Box>
                    <SkuDimensionsInputContainer />
                  </Box>
                </Stack>
                <Button variantColor="primaryColorVariant" type="submit">
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Box>
  );
};

const mapDispatchToProps: DispatchProps = {
  addSku: SkuActions.addSku,
};

export default WithAuth(
  connect<null, DispatchProps>(null, mapDispatchToProps)(Sku)
);
