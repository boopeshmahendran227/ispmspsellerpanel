import Button from "../../src/components/Button";
import FieldInput from "../../src/components/FieldInput";
import FieldTextArea from "../../src/components/FieldTextArea";
import FieldSelect from "../../src/components/FieldSelect";
import {
  ProductSchema,
  BrandInterface,
  AttributeInterface,
} from "../../src/types/product";
import { RootState } from "../../src/reducers";
import ProductActions from "../../src/actions/product";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import useSWR from "swr";
import Error from "next/error";
import Loader from "../../src/components/Loader";
import UIActions from "../../src/actions/ui";
import AttributeModal from "../../src/components/AttributeModal";
import SkuModal from "../../src/components/SkuModal";
import { useState } from "react";
import TierPriceInput from "../../src/components/TierpriceInput";
import FAQInput from "../../src/components/FAQInput";

interface StateProps {}

interface DispatchProps {
  showAttributeModal: () => void;
}

type AddProductProps = StateProps & DispatchProps;

const AddProduct = (props: AddProductProps) => {
  const brandSWR = useSWR("/brand");
  const attributeSWR = useSWR("/attribute");

  const [skuModalOpen, setSkuModalOpen] = useState(false);

  const brands: BrandInterface[] = brandSWR.data;
  const attributes: AttributeInterface[] = attributeSWR.data;

  const error = brandSWR.error || attributeSWR.error;

  if (error) {
    return <Error title="Unexpected error occured" statusCode={500} />;
  }

  if (!brands || !attributes) {
    return <Loader />;
  }

  const onSubmit = (values) => {};

  return (
    <div className="container">
      <AttributeModal />
      <SkuModal open={skuModalOpen} onClose={() => setSkuModalOpen(false)} />
      <div className="formContainer">
        <Formik
          initialValues={{
            tierPrice: [
              {
                minQty: 0,
                discountPercentage: 0,
              },
            ],
            faqs: [
              {
                question: "",
                answer: "",
              },
            ],
            specification: {
              name: null,
              itemGroups: [],
            },
          }}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <FieldInput name="name" label="Name" />
              <FieldInput name="shortDescription" label="Short Description" />
              <FieldInput name="longDescription" label="Long Description" />
              <FieldInput name="brand" label="Brand" />
              <FieldInput name="minPrice" label="Min Price" />
              <FieldInput name="maxPrice" label="Max Price" />
              <Button onClick={() => props.showAttributeModal()}>
                Create New Attribute
              </Button>
              <Button onClick={() => setSkuModalOpen(true)}>Create SKUs</Button>
              <TierPriceInput />
              <FAQInput />
              <div>
                <Button isSubmitButton={true}>Add</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <style jsx>{`
        .formContainer {
          max-width: 800px;
          margin: auto;
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({});

const mapDispatchToProps: DispatchProps = {
  showAttributeModal: UIActions.showAttributeModal,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(AddProduct);
