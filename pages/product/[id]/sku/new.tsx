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
import FieldMultiSelect from "components/FieldMultiSelect";

const Sku = () => {
  const router = useRouter();
  const swr = useSWR(`/product/${router.query.id}`);
  const skuId: string = router.query.skuId as string;
  const product = swr.data;

  const error = swr.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!product) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="headerContainer">
        <BackLink href="/product/[id]" as={`/product/${product.id}`}>
          Back to Product
        </BackLink>
        <PageHeader>Add Variant</PageHeader>
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
            }}
            onSubmit={() => null}
          >
            {() => (
              <Form>
                <SectionCard>
                  <SectionHeader>Options</SectionHeader>
                  <label>Color</label>
                  <FieldMultiSelect name="length" options={[]} />
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
