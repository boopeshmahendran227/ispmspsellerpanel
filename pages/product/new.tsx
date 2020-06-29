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
  SelectOptionInterface,
} from "../../src/types/product";
import { RootState } from "../../src/reducers";
import ProductActions from "../../src/actions/product";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import useSWR from "swr";
import Loader from "../../src/components/Loader";
import AttributeModal from "../../src/components/AttributeModal";
import SkuModal from "../../src/components/SkuModal";
import TierPriceInput from "../../src/components/TierpriceInput";
import FAQInput from "../../src/components/FAQInput";
import SpecificationInput from "../../src/components/SpecificationInput";
import {
  flattenCategoryTree,
  getChildCategories,
} from "../../src/utils/categoryTree";
import InputLabel from "../../src/components/InputLabel";
import { getSkus } from "../../src/selectors/product";
import SkuInputTable from "../../src/components/SkuInputTable";
import FieldTextArea from "../../src/components/FieldTextArea";
import { useRef, useEffect } from "react";
import PageError from "../../src/components/PageError";
import { CategoryTreeInterface } from "../../src/types/categoryTree";
import CSSConstants from "../../src/constants/CSSConstants";
import Tooltip from "../../src/components/Tooltip";
import PageHeader from "../../src/components/PageHeader";
import { BusinessDataInterface } from "../../src/types/business";

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
  const categorySWR = useSWR("/category/tree");
  const taxSWR = useSWR("/tax/taxgroup");
  const businessSWR = useSWR("/businesses/business");

  const brands: BrandInterface[] = brandSWR.data;
  const attributes: AttributeInterface[] = attributeSWR.data;
  const categoryTree: CategoryTreeInterface = categorySWR.data;
  const taxGroups: TaxGroupInterface[] = taxSWR.data;
  const businessData: BusinessDataInterface = businessSWR.data;

  const categories = flattenCategoryTree(categoryTree);

  const error =
    brandSWR.error ||
    attributeSWR.error ||
    categorySWR.error ||
    taxSWR.error ||
    businessSWR.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!brands || !attributes || !categories || !taxGroups || !businessData) {
    return <Loader />;
  }

  const onSubmit = (values: ProductInputInterface) => {
    props.addProduct(values);
  };

  const getOtherCategories = (defaultCategory: SelectOptionInterface) => {
    if (defaultCategory) {
      const category = categories.find(
        (category) => category.id === defaultCategory.value
      );
      return getChildCategories(category);
    }
    return categories;
  };

  return (
    <div className="container">
      <PageHeader>Add Product</PageHeader>
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
            ecosystems: [],
            defaultCategory: null,
            taxGroup: null,
          }}
          onSubmit={onSubmit}
          validationSchema={ProductSchema}
        >
          {({ resetForm, values }) => (
            <Form>
              <SkuModal />
              <div className="gridContainer">
                <InputLabel label="Name" />
                <FieldInput name="name" />
                <InputLabel label="Short Description" />
                <FieldInput name="shortDescription" />
                <InputLabel label="Long Description" />
                <FieldTextArea name="longDescription" />
                <InputLabel label="Main Category" />
                <FieldSelect
                  name="defaultCategory"
                  options={categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                  }))}
                />
                <InputLabel label="Other Categories" />
                <Tooltip trigger="focus" tooltip="Select Other Categories">
                  <FieldMultiSelect
                    name="categories"
                    options={getOtherCategories(values.defaultCategory).map(
                      (category) => ({
                        value: category.id,
                        label: category.name,
                      })
                    )}
                  />
                </Tooltip>
                <InputLabel label="Ecosystems" />
                <FieldMultiSelect
                  name="ecosystems"
                  options={businessData.ecosystems.map((ecosystem) => ({
                    value: ecosystem._id,
                    label: (
                      <span className="ecosystemOptionName">
                        <span className="contentContainer">
                          <span>{ecosystem.ecosystem_id.ecosystem_name}</span>
                          <span className="ecoUrl">
                            {ecosystem.ecosystem_id.ecosystem_url}
                          </span>
                        </span>
                        <span className="iconContainer">
                          {ecosystem.ecosystem_id.mode === "PRIVATE" ? (
                            <i
                              className="privateIcon fa fa-lock"
                              aria-hidden="true"
                            ></i>
                          ) : (
                            <i className="publicIcon fas fa-users"></i>
                          )}
                        </span>
                      </span>
                    ),
                  }))}
                />
                <InputLabel label="Brand" />
                <FieldSelect
                  name="brand"
                  options={brands.map((brand) => ({
                    value: brand.id,
                    label: brand.name,
                  }))}
                />
                <InputLabel label="Special Discount Value" />
                <Tooltip
                  trigger="focus"
                  tooltip="This discount value will always be applied"
                >
                  <FieldInput name="specialDiscountValue" />
                </Tooltip>
                <InputLabel label="Min Price" />
                <Tooltip
                  trigger="focus"
                  tooltip="Minimum price after all discounts"
                >
                  <FieldInput name="minPrice" />
                </Tooltip>
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
        .ecosystemOptionName {
          display: inline-flex;
          width: 100%;
          justify-content: space-between;
        }
        .ecosystemOptionName .contentContainer {
          display: flex;
          flex-direction: column;
        }
        .ecoUrl {
          font-size: 0.8rem;
          color: ${CSSConstants.secondaryTextColor};
        }
        .publicIcon {
          color: ${CSSConstants.successColor};
        }
        .privateIcon {
          color: ${CSSConstants.dangerColor};
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

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(AddProduct);
