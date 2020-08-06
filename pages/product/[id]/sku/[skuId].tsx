import useSWR from "swr";
import Loader from "../../../../src/components/Loader";
import PageError from "../../../../src/components/PageError";
import PageHeader from "../../../../src/components/PageHeader";
import WithAuth from "../../../../src/components/WithAuth";
import { useRouter } from "next/router";
import SkuList from "../../../../src/components/SkuList";
import Card from "../../../../src/components/Card";
import FieldPriceInput from "../../../../src/components/FieldPriceInput";
import { Formik, Form } from "formik";
import FieldNumInput from "../../../../src/components/FieldNumInput";
import FieldInput from "../../../../src/components/FieldInput";
import SkuProductInfo from "../../../../src/components/SkuProductInfo";

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
        <PageHeader>{skuId}</PageHeader>
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
                <div className="inputSection">
                  <Card>
                    <header>Pricing</header>
                    <label>Price</label>
                    <FieldPriceInput name="price" />
                    <label>Bought Price</label>
                    <FieldPriceInput name="boughtPrice" />
                  </Card>
                </div>
                <div className="inputSection">
                  <Card>
                    <header>Inventory</header>
                    <label>Qty</label>
                    <FieldNumInput name="qty" />
                    <label>Bar Code</label>
                    <FieldInput name="barCode" />
                    <label>External Id</label>
                    <FieldInput name="externalId" />
                  </Card>
                </div>
                <div className="inputSection">
                  <Card>
                    <header>Dimensions</header>
                    <label>Length</label>
                    <FieldNumInput name="length" />
                    <label>Width</label>
                    <FieldInput name="width" />
                    <label>Height</label>
                    <FieldInput name="height" />
                    <label>Weight</label>
                    <FieldInput name="weight" />
                  </Card>
                </div>
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
        }
        .inputSection {
          margin-bottom: 1em;
          margin-left: 1em;
        }
        .inputSection header {
          font-size: 1.3rem;
          font-weight: bold;
          margin-bottom: 0.8em;
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
