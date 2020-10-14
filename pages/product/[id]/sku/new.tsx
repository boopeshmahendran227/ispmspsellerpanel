import useSWR from "swr";
import Loader from "components/Loader";
import PageError from "components/PageError";
import PageHeader from "components/PageHeader";
import WithAuth from "components/WithAuth";
import { useRouter } from "next/router";
import SkuList from "components/SkuList";
import { Formik, ErrorMessage, Form } from "formik";
import SkuProductInfo from "components/SkuProductInfo";
import BackLink from "components/atoms/BackLink";
import SectionHeader from "components/atoms/SectionHeader";
import SectionCard from "components/SectionCard";
import _ from "lodash";
import { ProductDetailInterface } from "types/product";
import FieldSelect from "components/FieldSelect";
import { AddSkuInterface } from "types/sku";
import * as Yup from "yup";
import { connect } from "react-redux";
import SkuActions from "actions/sku";
import styled from "styled-components";
import Button from "components/atoms/Button";
import FieldEcosystemMultiInput from "components/FieldEcosystemMultiInput";
import FieldInput from "components/FieldInput";
import { EcosystemResponseInterface } from "types/business";
import SkuDimensionsInputContainer from "components/SkuDimensionsInputContainer";
import SkuInventoryInputContainer from "components/SkuInventoryInputContainer";
import SkuPricingInputContainer from "components/SkuPricingInputContainer";
import FieldNumInput from "components/FieldNumInput";
import FieldPercentageInput from "components/FieldPercentageInput";
import ImageUploader from "components/ImageUploader";
import ValidationErrorMsg from "components/ValidationErrorMsg";

interface DispatchProps {
  addSku: (sku: AddSkuInterface) => void;
}

type SkuProps = DispatchProps;

const validationSchema = Yup.object({
  imageUrls: Yup.array().of(Yup.string()).required("Image is required"),
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
      imageRelativePaths: values.imageUrls.map((imageurl) => imageurl.url),
      productId: product.id,
      attributeValueIds: values.attributes.map((attribute) => ({
        attributeId: attribute.attributeId,
        attributeName: attribute.attributeName,
        valueId: attribute.value.value,
        value: attribute.value.label,
      })),
    });
  };

  return (
    <div className="container">
      <div className="headerContainer">
        <BackLink href="/product/[id]" as={`/product/${product.id}`}>
          Back to Product
        </BackLink>
        <PageHeader>Add New Variant</PageHeader>
      </div>
      <FlexRowContainer>
        <div>
          <SkuProductInfo
            productId={product.id}
            productName={product.name}
            image={
              product.skuDetails[0]?.imageRelativePaths[0] ||
              product.unOwnedSkuDetails[0]?.imageRelativePaths[0]
            }
          />
          <SkuList productId={product.id} skus={product.skuDetails} />
        </div>
        <div className="formContainer">
          <Formik
            initialValues={
              skuToCopyFrom
                ? {
                    imageUrls: skuToCopyFrom.imageRelativePaths,
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
                    imageUrls: [],
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
            {({ setFieldValue, values }) => (
              <Form>
                <FlexColumnContainer>
                  <SectionCard>
                    <SectionHeader>Sku Details</SectionHeader>
                    <div>
                      <label>Sku Id</label>
                      <FieldInput name="skuId" />
                    </div>
                  </SectionCard>
                  <SectionCard>
                    <SectionHeader>Options</SectionHeader>
                    {attributes.map((attribute, index) => (
                      <>
                        <label>{attribute.attributeName}</label>
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
                  <ImageUploader
                    onDeleteAll={() => setFieldValue("imageUrls", [])}
                    onImageDelete={(index) =>
                      setFieldValue(
                        "imageUrls",
                        values.imageUrls.filter(
                          (imageUrl) => imageUrl.index !== index
                        )
                      )
                    }
                    onImageEdit={(addUpdateIndex) => {
                      setFieldValue(
                        "imageUrls",
                        values.imageUrls.filter(
                          (imageUrl) => imageUrl.index !== addUpdateIndex
                        )
                      );
                    }}
                    setFieldValue={(addUpdateIndex, imageList, res) => {
                      if (values.imageUrls.length > 0) {
                        setFieldValue("imageUrls", [
                          ...values.imageUrls,
                          {
                            index: addUpdateIndex,
                            dataURL: imageList[addUpdateIndex].dataURL,
                            isUploaded: true,
                            url: res,
                            name: imageList[addUpdateIndex].file.name,
                          },
                        ]);
                      } else {
                        setFieldValue("imageUrls", [
                          {
                            index: addUpdateIndex,
                            dataURL: imageList[addUpdateIndex].dataURL,
                            isUploaded: true,
                            url: res,
                            name: imageList[addUpdateIndex].file.name,
                          },
                        ]);
                      }
                    }}
                  />
                  <ErrorMessage
                    component={ValidationErrorMsg}
                    name={"imageUrls"}
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
  addSku: SkuActions.addSku,
};

export default WithAuth(
  connect<null, DispatchProps>(null, mapDispatchToProps)(Sku)
);
