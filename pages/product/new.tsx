import Button from "../../src/components/Button";
import FieldInput from "../../src/components/FieldInput";
import FieldSelect from "../../src/components/FieldSelect";
import FieldMultiSelect from "../../src/components/FieldMultiSelect";
import {
  ProductSchema,
  BrandInterface,
  AttributeInterface,
  ProductSkuDetail,
} from "../../src/types/product";
import { RootState } from "../../src/reducers";
import ProductActions from "../../src/actions/product";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import useSWR from "swr";
import Error from "next/error";
import Loader from "../../src/components/Loader";
import UIActions from "../../src/actions/ui";
import AttributeModal from "../../src/components/AttributeModal";
import SkuModal from "../../src/components/SkuModal";
import { useState } from "react";
import TierPriceInput from "../../src/components/TierpriceInput";
import FAQInput from "../../src/components/FAQInput";
import SpecificationInput from "../../src/components/SpecificationInput";
import { flattenCategoryTree } from "../../src/utils/categoryTree";
import InputLabel from "../../src/components/InputLabel";
import { getSkus } from "../../src/selectors/product";
import SkuInputTable from "../../src/components/SkuInputTable";

interface StateProps {
  skus: ProductSkuDetail[];
}

interface DispatchProps {
  showAttributeModal: () => void;
}

type AddProductProps = StateProps & DispatchProps;

const AddProduct = (props: AddProductProps) => {
  const brandSWR = useSWR("/brand");
  const attributeSWR = useSWR("/attribute");
  const categorySWR = useSWR("/category/tree");

  const [skuModalOpen, setSkuModalOpen] = useState(false);

  const brands: BrandInterface[] = brandSWR.data;
  const attributes: AttributeInterface[] = attributeSWR.data;
  const categories = flattenCategoryTree(categorySWR.data);

  const error = brandSWR.error || attributeSWR.error || categorySWR.error;

  if (error) {
    return <Error title="Unexpected error occured" statusCode={500} />;
  }

  if (!brands || !attributes || !categories) {
    return <Loader />;
  }

  const onSubmit = (values) => {};

  return (
    <div className="container">
      <AttributeModal />
      <div className="formContainer">
        <Formik
          initialValues={{
            name: "test",
            shortDescription: "",
            longDescription: "",
            minPrice: 0,
            maxPrice: 0,
            brand: null,
            tierPrice: [
              {
                minQty: 0,
                discountPercentage: 0,
              },
            ],
            faqs: [],
            specification: {
              name: null,
              itemGroups: [],
            },
            skus: props.skus,
            categories: [],
          }}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {() => (
            <Form>
              <SkuModal
                open={skuModalOpen}
                onClose={() => setSkuModalOpen(false)}
              />
              <div className="gridContainer">
                <InputLabel label="Name" />
                <FieldInput name="name" />
                <InputLabel label="Short Description" />
                <FieldInput name="shortDescription" />
                <InputLabel label="Long Description" />
                <FieldInput name="longDescription" />
                <InputLabel label="Brand" />
                <FieldSelect
                  name="brand"
                  options={brands.map((brand) => ({
                    value: brand.id,
                    label: brand.name,
                  }))}
                />
                <InputLabel label="Default Category" />
                <FieldSelect
                  name="defaultCategory"
                  options={categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                  }))}
                />
                <InputLabel label="All Categories" />
                <FieldMultiSelect
                  name="categories"
                  options={categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                  }))}
                />
                <InputLabel label="Min Price" />
                <FieldInput name="minPrice" />
                <InputLabel label="Max Price" />
                <FieldInput name="maxPrice" />
              </div>
              <Button onClick={() => props.showAttributeModal()}>
                Create New Attribute
              </Button>
              <Button onClick={() => setSkuModalOpen(true)}>Create SKUs</Button>
              <SkuInputTable />
              <TierPriceInput />
              <FAQInput />
              <SpecificationInput />
              <div>
                <Button isSubmitButton={true}>Add</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <style jsx>{`
        .gridContainer {
          display: grid;
          grid-template-columns: 200px 1fr;
        }
        .formContainer {
          max-width: 1200px;
          margin: auto;
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  skus: getSkus(state),
});

const mapDispatchToProps: DispatchProps = {
  showAttributeModal: UIActions.showAttributeModal,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(AddProduct);
