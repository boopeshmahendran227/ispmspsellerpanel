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

const Sku = () => {
  const router = useRouter();
  const swr = useSWR(`/product/seller/${router.query.id}`);
  const currentSkuId: string = router.query.skuId as string;
  const product: ProductDetailInterface = swr.data;

  const error = swr.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!product) {
    return <Loader />;
  }

  const currentSku = product.skuDetails.find(
    (sku) => sku.skuId === currentSkuId
  );

  const attributes = product.attributeValues;

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
              price: currentSku.price,
              boughtPrice: currentSku.boughtPrice,
              qty: currentSku.qty,
              barCode: currentSku.barCodeIdentifier,
              externalId: currentSku.externalId,
              length: currentSku.length,
              width: currentSku.width,
              height: currentSku.height,
              weight: currentSku.weight,
              attributes: _.zipObject(
                currentSku.attributeValueIds.map((item) => item.attributeId),
                currentSku.attributeValueIds.map((item) => ({
                  value: item.valueId,
                  label: item.value,
                }))
              ),
            }}
            enableReinitialize={true}
            onSubmit={() => null}
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
                  <FieldInput name="barCode" />
                  <label>External Id</label>
                  <FieldInput name="externalId" />
                </SectionCard>
                <SectionCard>
                  <SectionHeader>Dimensions</SectionHeader>
                  <label>Length</label>
                  <FieldInput name="length" />
                  <label>Width</label>
                  <FieldInput name="width" />
                  <label>Height</label>
                  <FieldInput name="height" />
                  <label>Weight</label>
                  <FieldInput name="weight" />
                </SectionCard>
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

export default WithAuth(Sku);
