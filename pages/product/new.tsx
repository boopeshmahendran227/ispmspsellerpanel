import Button, { ButtonType } from "components/atoms/Button";
import FieldInput from "components/molecules/FieldInput";
import FieldSelect from "components/molecules/FieldSelect";
import FieldMultiSelect from "components/molecules/FieldMultiSelect";
import {
  ProductSchema,
  BrandInterface,
  AttributeInterface,
  ProductSkuDetail,
  ProductInputInterface,
  TaxGroupInterface,
} from "types/product";
import { RootState } from "../../src/reducers";
import ProductActions from "actions/product";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import useSWR from "swr";
import Loader from "components/atoms/Loader";
import AttributeModal from "components/AttributeModal";
import SkuModal from "components/SkuModal";
import SpecificationInput from "components/SpecificationInput";
import InputLabel from "components/InputLabel";
import { getSkus } from "../../src/selectors/product";
import SkuInputTable from "components/SkuInputTable";
import FieldTextArea from "components/molecules/FieldTextArea";
import { useRef, useEffect } from "react";
import PageError from "components/atoms/PageError";
import Tooltip from "components/atoms/Tooltip";
import PageHeader from "components/PageHeader";
import { EcosystemResponseInterface } from "types/business";
import FieldEcosystemMultiInput from "components/molecules/FieldEcosystemMultiInput";
import WithAuth from "components/WithAuth";
import FieldPriceInput from "components/molecules/FieldPriceInput";
import listOfCountries from "../../src/data/listOfCountries";
import FAQInput from "components/FAQInput";
import TierPriceInput from "components/TierpriceInput";
import Checkbox from "components/atoms/Checkbox";
import { CategoryInterface } from "types/category";

interface StateProps {
  skus: ProductSkuDetail[];
}

interface DispatchProps {
  addProduct: (product: ProductInputInterface) => void;
  initProductCreate: () => void;
}

type AddProductProps = StateProps & DispatchProps;

const AddProduct = (props: AddProductProps) => {
  const formikRef: any = useRef(null);

  useEffect(() => {
    props.initProductCreate();
  }, []);

  useEffect(() => {
    formikRef?.current?.setFieldValue("skus", props.skus);
  }, [props.skus]);

  const brandSWR = useSWR("/brand");
  const attributeSWR = useSWR("/attribute");
  const categorySWR = useSWR("/category/all");
  const taxSWR = useSWR("/tax/taxgroup");
  const businessSWR = useSWR("/businesses/ecosystems/all");

  const brands: BrandInterface[] = brandSWR.data;
  const attributes: AttributeInterface[] = attributeSWR.data;
  const categories: CategoryInterface[] = categorySWR.data;
  const taxGroups: TaxGroupInterface[] = taxSWR.data;
  const ecosystemData: EcosystemResponseInterface = businessSWR.data;

  const error =
    brandSWR.error ||
    attributeSWR.error ||
    categorySWR.error ||
    taxSWR.error ||
    businessSWR.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!brands || !attributes || !categories || !taxGroups || !ecosystemData) {
    return <Loader />;
  }

  const onSubmit = (values: ProductInputInterface) => {
    props.addProduct(values);
  };

  return (
    <div className="container">
      <PageHeader>Add Product</PageHeader>
      <div className="formContainer">
        <Formik
          innerRef={formikRef}
          initialValues={{
            isActive: true,
            name: "",
            shortDescription: "",
            longDescription: "",
            hsnCode: "",
            specialDiscountValue: 0,
            minPrice: 0,
            maxPrice: 0,
            brand: null,
            countryOfOrigin: null,
            tierPrices: [],
            faqs: [],
            specification: {
              itemGroups: [],
            },
            skus: props.skus,
            categories: [],
            ecosystems: [],
            defaultCategory: null,
            taxGroup: null,
          }}
          onSubmit={onSubmit}
          validationSchema={ProductSchema}
        >
          {({ resetForm, values, setFieldValue }) => (
            <Form>
              <SkuModal />
              <div className="gridContainer">
                <InputLabel label="Is Active" />
                <Field name="isActive">
                  {({ field }) => (
                    <Checkbox
                      checked={values.isActive}
                      onChange={(e) =>
                        setFieldValue("isActive", e.target.checked)
                      }
                    />
                  )}
                </Field>
                <InputLabel label="Name" />
                <FieldInput name="name" />
                <InputLabel label="Short Description" />
                <FieldInput name="shortDescription" />
                <InputLabel label="Long Description" />
                <FieldTextArea name="longDescription" />
                <InputLabel label="HSN Code" />
                <FieldInput name="hsnCode" />
                <InputLabel label="Main Category" />
                <FieldSelect
                  name="defaultCategory"
                  options={categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                  }))}
                />
                <InputLabel label="Other Categories" />
                <FieldMultiSelect
                  name="categories"
                  options={categories
                    .filter(
                      (category) =>
                        category.id !== values.defaultCategory?.value
                    )
                    .map((category) => ({
                      value: category.id,
                      label: category.name,
                    }))}
                />
                <InputLabel label="Ecosystems" />
                <FieldEcosystemMultiInput
                  name="ecosystems"
                  ecosystemData={ecosystemData}
                />
                <InputLabel label="Brand" />
                <FieldSelect
                  name="brand"
                  options={brands.map((brand) => ({
                    value: brand.id,
                    label: brand.name,
                  }))}
                />
                <InputLabel label="Country of Origin" />
                <FieldSelect
                  name="countryOfOrigin"
                  options={listOfCountries.map((country) => ({
                    value: country,
                    label: country,
                  }))}
                />
                <InputLabel label="Special Discount Value" />
                <Tooltip
                  trigger="focus"
                  tooltip="This discount value will always be applied"
                >
                  <FieldPriceInput name="specialDiscountValue" />
                </Tooltip>
                <InputLabel label="Min Price" />
                <Tooltip
                  trigger="focus"
                  tooltip="Minimum price after all discounts"
                >
                  <FieldPriceInput name="minPrice" />
                </Tooltip>
                <InputLabel label="Max Price" />
                <FieldPriceInput name="maxPrice" />
                <InputLabel label="Tax Group" />
                <FieldSelect
                  name="taxGroup"
                  options={taxGroups.map((taxGroup) => ({
                    value: taxGroup.id,
                    label: taxGroup.description,
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
        <AttributeModal categories={categories} />
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
          max-width: 700px;
          margin: auto;
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
  initProductCreate: ProductActions.initProductCreate,
};

export default WithAuth(
  connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
  )(AddProduct)
);
