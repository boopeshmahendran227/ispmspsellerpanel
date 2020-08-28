import useSWR from "swr";
import Loader from "components/Loader";
import PageError from "components/PageError";
import PageHeader from "components/PageHeader";
import WithAuth from "components/WithAuth";
import { useRouter } from "next/router";
import SkuList from "components/SkuList";
import FieldPriceInput from "components/FieldPriceInput";
import { Formik, Form } from "formik";
import FieldNumInput from "components/FieldNumInput";
import FieldInput from "components/FieldInput";
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

interface DispatchProps {
  addSku: (sku: AddSkuInterface) => void;
}

type SkuProps = DispatchProps;

const validationSchema = Yup.object({
  price: Yup.number().required(),
  boughtPrice: Yup.number().required(),
  qty: Yup.number().required(),
  barcodeIdentifier: Yup.string().nullable().defined(),
  externalId: Yup.string().nullable().defined(),
  length: Yup.number().nullable().defined(),
  width: Yup.number().nullable().defined(),
  height: Yup.number().nullable().defined(),
  weight: Yup.number().nullable().defined(),
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
    .min(1, "Atleast one ecosystem is required")
    .defined(),
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

const Sku = (props: SkuProps) => {
  const router = useRouter();
  const swr = useSWR(`/product/seller/${router.query.id}`);
  const skuId: string = router.query.skuId as string;
  const product: ProductDetailInterface = swr.data;

  const error = swr.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!product) {
    return <Loader />;
  }

  const attributes = product.attributeValues;

  const handleSubmit = (values: InputInterface) => {
    props.addSku({
      productId: product.id,
      imageRelativePaths: [],
      ...values,
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
        <PageHeader>Add Variant</PageHeader>
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
            currentSkuId={skuId}
          />
        </div>
        <div className="formContainer">
          <Formik
            initialValues={{
              price: 0,
              boughtPrice: 0,
              qty: 0,
              barCode: "",
              externalId: "",
              length: null,
              width: null,
              height: null,
              weight: null,
              attributes: attributes.map((attribute) => ({
                attributeId: attribute.attributeId,
                attributeName: attribute.attributeName,
                value: null,
              })),
            }}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <FlexColumnContainer>
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
                  <SectionCard>
                    <SectionHeader>Pricing</SectionHeader>
                    <label>Price</label>
                    <FieldPriceInput name="price" />
                    <label>Bought Price</label>
                    <FieldPriceInput name="boughtPrice" />
                  </SectionCard>
                  <SectionCard>
                    <SectionHeader>Inventory</SectionHeader>
                    <label>Qty</label>
                    <FieldNumInput name="qty" />
                    <label>Bar Code</label>
                    <FieldInput name="barCode" />
                    <label>External Id</label>
                    <FieldInput name="externalId" />
                  </SectionCard>
                  <SectionCard>
                    <SectionHeader>Dimensions</SectionHeader>
                    <label>Length</label>
                    <FieldNumInput name="length" />
                    <label>Width</label>
                    <FieldNumInput name="width" />
                    <label>Height</label>
                    <FieldNumInput name="height" />
                    <label>Weight</label>
                    <FieldNumInput name="weight" />
                  </SectionCard>
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
