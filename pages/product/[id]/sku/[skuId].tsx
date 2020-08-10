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
import SectionHeader from "components/SectionHeader";
import SectionCard from "components/SectionCard";
import ImageUploader from "components/ImageUploader";
import { ProductDetailInterface } from "types/product";
import _ from "lodash";
import FieldSelect from "components/FieldSelect";
import FieldEcosystemMultiInput from "components/FieldEcosystemMultiInput";
import { BusinessDataInterface } from "types/business";
import { connect } from "react-redux";
import SkuActions from "actions/sku";
import { UpdateSkuInterface } from "types/sku";
import Button from "components/atoms/Button";
import * as Yup from "yup";

interface DispatchProps {
  updateSku: (sku: UpdateSkuInterface) => void;
}

type SkuProps = DispatchProps;

const validationSchema = Yup.object({
  skuDetailId: Yup.number().required().defined(),
  price: Yup.number().required(),
  boughtPrice: Yup.number().required(),
  qty: Yup.number().required(),
  barcodeIdentifier: Yup.string().nullable().defined(),
  externalId: Yup.string().nullable().defined(),
  length: Yup.number().nullable().defined(),
  width: Yup.number().nullable().defined(),
  height: Yup.number().nullable().defined(),
  weight: Yup.number().nullable().defined(),
  ecosystems: Yup.array()
    .of(
      Yup.object({
        value: Yup.string().defined(),
        label: Yup.string().defined(),
      }).defined()
    )
    .min(1, "Atleast one ecosystem is required")
    .required()
    .defined(),
}).defined();

type InputInterface = Yup.InferType<typeof validationSchema>;

const Sku = (props: SkuProps): JSX.Element => {
  const router = useRouter();
  const productSwr = useSWR(`/product/seller/${router.query.id}`);
  const businessSWR = useSWR("/businesses/business");

  const currentSkuId: string = router.query.skuId as string;
  const product: ProductDetailInterface = productSwr.data;
  const businessData: BusinessDataInterface = businessSWR.data;

  const error = productSwr.error || businessSWR.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!product || !businessData) {
    return <Loader />;
  }

  const currentSku = product.skuDetails.find(
    (sku) => sku.skuId === currentSkuId
  );

  const attributes = product.attributeValues;

  const handleSubmit = (values: InputInterface) => {
    props.updateSku({
      ...values,
      ecosystemIds: values.ecosystems.map((ecosystem) => ecosystem.value),
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
      <div className="flexContainer">
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
              ecosystems: [],
              attributes: _.zipObject(
                currentSku.attributeValueIds.map((item) => item.attributeId),
                currentSku.attributeValueIds.map((item) => ({
                  value: item.valueId,
                  label: item.value,
                }))
              ),
            }}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <SectionCard>
                  <SectionHeader>Options</SectionHeader>
                  {attributes.map((attribute) => (
                    <>
                      <label>{attribute.attributeName}</label>
                      <FieldSelect
                        disabled={true}
                        name={`attributes.${attribute.attributeId}`}
                        options={attribute.attributeValues.map((value) => ({
                          value: value.valueId,
                          label: value.value,
                        }))}
                      />
                    </>
                  ))}
                </SectionCard>
                <ImageUploader />
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
                  <FieldInput name="barcodeIdentifier" />
                  <label>External Id</label>
                  <FieldInput name="externalId" />
                </SectionCard>
                <SectionCard>
                  <SectionHeader>Visibility</SectionHeader>
                  <label>Ecosystem</label>
                  <FieldEcosystemMultiInput
                    name="ecosystems"
                    businessData={businessData}
                  />
                </SectionCard>
                <SectionCard>
                  <SectionHeader>Dimensions</SectionHeader>
                  <label>Length (in cm)</label>
                  <FieldNumInput name="length" />
                  <label>Width (in cm)</label>
                  <FieldNumInput name="width" />
                  <label>Height (in cm)</label>
                  <FieldNumInput name="height" />
                  <label>Weight (in Kg)</label>
                  <FieldNumInput name="weight" />
                </SectionCard>
                <Button isSubmitButton={true}>Save</Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
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
