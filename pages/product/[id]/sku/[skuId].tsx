import { Fragment } from "react";
import useSWR from "swr";
import Loader from "components/Loader";
import PageError from "components/PageError";
import PageHeader from "components/PageHeader";
import WithAuth from "components/WithAuth";
import { useRouter } from "next/router";
import SkuList from "components/SkuList";
import { Formik, Form, ErrorMessage } from "formik";
import SkuProductInfo from "components/SkuProductInfo";
import BackLink from "components/atoms/BackLink";
import SectionHeader from "components/atoms/SectionHeader";
import SectionCard from "components/SectionCard";
import ImageUploader from "components/ImageUploader";
import { ProductDetailInterface } from "types/product";
import _ from "lodash";
import FieldSelect from "components/FieldSelect";
import FieldEcosystemMultiInput from "components/FieldEcosystemMultiInput";
import { EcosystemResponseInterface } from "types/business";
import { connect } from "react-redux";
import SkuActions from "actions/sku";
import { UpdateSkuInterface } from "types/sku";
import Button from "components/atoms/Button";
import * as Yup from "yup";
import styled from "styled-components";
import SkuDimensionsInputContainer from "components/SkuDimensionsInputContainer";
import SkuInventoryInputContainer from "components/SkuInventoryInputContainer";
import SkuPricingInputContainer from "components/SkuPricingInputContainer";
import FieldNumInput from "components/FieldNumInput";
import FieldPercentageInput from "components/FieldPercentageInput";
import ValidationErrorMsg from "components/ValidationErrorMsg";
import { getProductImageUrl } from "utils/url";
import SkuImageUploader from "components/SkuImageUploader";

interface DispatchProps {
  updateSku: (sku: UpdateSkuInterface) => void;
}

type SkuProps = DispatchProps;

const validationSchema = Yup.object({
  images: Yup.array()
    .of(
      Yup.object({
        index: Yup.number(),
        dataURL: Yup.string(),
        url: Yup.string(),
      }).defined()
    )
    .defined(),
  specialDiscount: Yup.number().required(),
  specialDiscountPercentage: Yup.number().required().max(100),
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
  minOrderQty: Yup.number().nullable().defined(),
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em;
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
    const imageUrl = values.images.map((image) => image.url);
    const filteredValues = _.omit(values, "images");
    props.updateSku({
      ...filteredValues,
      imageRelativePaths: imageUrl,
    });
  };

  return (
    <div className="container">
      <div className="headerContainer">
        <BackLink href="/product/[id]" as={`/product/${product.id}`}>
          Back to Product
        </BackLink>
        <PageHeader>{currentSkuId}</PageHeader>
      </div>
      <FlexRowContainer>
        <div>
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
        </div>
        <div className="formContainer">
          <Formik
            initialValues={{
              images: currentSku.imageRelativePaths.map(
                (imageRelativePath, index) => {
                  return {
                    index: index,
                    dataURL: getProductImageUrl(imageRelativePath),
                    url: imageRelativePath,
                  };
                }
              ),
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
              specialDiscount: currentSku.specialDiscount,
              specialDiscountPercentage: currentSku.specialDiscountPercentage,
              minOrderQty: currentSku.minOrderQty,
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
            {({ setFieldValue, values }) => (
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
                  <SkuImageUploader
                    initialValues={values.images}
                    images={values.images}
                    onImageAdd={(values) => setFieldValue("images", values)}
                    onImageDelete={(value) => setFieldValue("images", value)}
                    onImageEdit={(value) => setFieldValue("images", value)}
                    onImageDeleteAll={(value) => setFieldValue("images", value)}
                  />
                  <ErrorMessage
                    component={ValidationErrorMsg}
                    name={"images"}
                  />
                  <SkuPricingInputContainer />
                  <SectionCard>
                    <SectionHeader>Special Discount</SectionHeader>
                    <Grid>
                      <div>
                        <label>Special Discount Price</label>
                        <FieldNumInput name="specialDiscount" />
                      </div>
                      <div>
                        <label>Special Discount Percentage</label>
                        <FieldPercentageInput name="specialDiscountPercentage" />
                      </div>
                    </Grid>
                  </SectionCard>
                  <SkuInventoryInputContainer />
                  <SectionCard>
                    <SectionHeader>Visibility</SectionHeader>
                    <label>Ecosystem</label>
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
        </div>
      </FlexRowContainer>
      <style jsx>{`
        .container {
          max-width: 900px;
          margin: auto;
        }
        .headerContainer {
          margin: 1.3em 0;
        }
        .flexContainer {
          display: flex;
        }
        .formContainer {
          flex: 1;
          margin-bottom: 1em;
          margin-left: 1em;
        }
        label {
          margin-top: 0.3em;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

const mapDispatchToProps: DispatchProps = {
  updateSku: SkuActions.updateSku,
};

export default WithAuth(
  connect<null, DispatchProps>(null, mapDispatchToProps)(Sku)
);
