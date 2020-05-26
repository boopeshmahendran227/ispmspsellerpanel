import Button, { ButtonType } from "../../src/components/Button";
import FieldInput from "../../src/components/FieldInput";
import FieldSelect from "../../src/components/FieldSelect";
import FieldMultiSelect from "../../src/components/FieldMultiSelect";
import {
  ProductSchema,
  BrandInterface,
  AttributeInterface,
  ProductSkuDetail,
  ProductInputInterface,
  TaxGroupInterface,
} from "../../src/types/product";
import { RootState } from "../../src/reducers";
import ProductActions from "../../src/actions/product";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import useSWR from "swr";
import Error from "next/error";
import Loader from "../../src/components/Loader";
import AttributeModal from "../../src/components/AttributeModal";
import SkuModal from "../../src/components/SkuModal";
import TierPriceInput from "../../src/components/TierpriceInput";
import FAQInput from "../../src/components/FAQInput";
import SpecificationInput from "../../src/components/SpecificationInput";
import { flattenCategoryTree } from "../../src/utils/categoryTree";
import InputLabel from "../../src/components/InputLabel";
import { getSkus } from "../../src/selectors/product";
import SkuInputTable from "../../src/components/SkuInputTable";
import FieldTextArea from "../../src/components/FieldTextArea";
import { useRef, useEffect } from "react";

interface StateProps {
  skus: ProductSkuDetail[];
}

interface DispatchProps {
  addProduct: (product: ProductInputInterface) => void;
}

type AddProductProps = StateProps & DispatchProps;

const AddProduct = (props: AddProductProps) => {
  const formikRef: any = useRef(null);

  useEffect(() => {
    formikRef?.current?.setFieldValue("skus", props.skus);
  }, [props.skus]);

  const brandSWR = useSWR("/brand");
  const attributeSWR = useSWR("/attribute");
  const categorySWR = useSWR("/category/tree");
  const taxSWR = useSWR("/tax/taxgroup");

  const brands: BrandInterface[] = brandSWR.data;
  const attributes: AttributeInterface[] = attributeSWR.data;
  const categories = flattenCategoryTree(categorySWR.data);
  const taxGroups: TaxGroupInterface[] = taxSWR.data;

  const error =
    brandSWR.error || attributeSWR.error || categorySWR.error || taxSWR.error;

  if (error) {
    return <Error title="Unexpected error occured" statusCode={500} />;
  }

  if (!brands || !attributes || !categories || !taxGroups) {
    return <Loader />;
  }

  const onSubmit = (values: ProductInputInterface) => {
    console.log(values);
    props.addProduct(values);
  };

  return (
    <div className="container">
      <header>Add Product</header>
      <div className="formContainer">
        <Formik
          innerRef={formikRef}
          initialValues={{
            name: "",
            shortDescription: "",
            longDescription: "",
            specialDiscountValue: 0,
            minPrice: 0,
            maxPrice: 0,
            brand: null,
            tierPrices: [],
            faqs: [],
            specification: {
              itemGroups: [],
            },
            skus: props.skus,
            categories: [],
            defaultCategory: null,
            taxGroup: null,
          }}
          onSubmit={onSubmit}
          validationSchema={ProductSchema}
        >
          {({ errors, resetForm }) => (
            <Form>
              {console.log(errors)}
              <SkuModal />
              <div className="gridContainer">
                <InputLabel label="Name" />
                <FieldInput name="name" />
                <InputLabel label="Short Description" />
                <FieldTextArea name="shortDescription" />
                <InputLabel label="Long Description" />
                <FieldTextArea name="longDescription" />
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
                <InputLabel label="Special Discount Value" />
                <FieldInput name="specialDiscountValue" />
                <InputLabel label="Min Price" />
                <FieldInput name="minPrice" />
                <InputLabel label="Max Price" />
                <FieldInput name="maxPrice" />
                <InputLabel label="Tax Group" />
                <FieldSelect
                  name="taxGroup"
                  options={taxGroups.map((taxGroup) => ({
                    value: taxGroup.id,
                    label: taxGroup.desscription,
                  }))}
                />
              </div>
              <SkuInputTable />
              <TierPriceInput />
              <FAQInput />
              <SpecificationInput />
              <div className="buttonContainer">
                <Button type={ButtonType.success} isSubmitButton={true}>
                  Submit
                </Button>
                <Button
                  onClick={resetForm}
                  type={ButtonType.success}
                  outlined={true}
                >
                  Clear
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <AttributeModal />
      </div>
      <style jsx>{`
        .container {
          padding: 0 1em;
        }
        header {
          font-size: 1.4rem;
          margin: 1em;
          text-transform: uppercase;
        }
        .gridContainer {
          display: grid;
          grid-template-columns: 200px 1fr;
          align-items: center;
          font-size: 1.1rem;
        }
        .formContainer {
          max-width: 1200px;
          margin: auto;
        }
        .buttonContainer {
          text-align: center;
          font-size: 1.2rem;
          margin-bottom: 1em;
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  skus: getSkus(state),
});

const mapDispatchToProps: DispatchProps = {
  addProduct: ProductActions.addProduct,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(AddProduct);
