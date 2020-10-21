import FieldInput from "components/atoms/FieldInput";
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
import { Formik, Form, Field, ErrorMessage } from "formik";
import useSWR from "swr";
import Loader from "components/atoms/Loader";
import AttributeModal from "components/molecules/AttributeModal";
import SkuModal from "components/molecules/SkuModal";
import SpecificationInput from "components/molecules/SpecificationInput";
import InputLabel from "components/atoms/InputLabel";
import { getSkus } from "../../src/selectors/product";
import SkuInputTable from "components/molecules/SkuInputTable";
import FieldTextArea from "components/atoms/FieldTextArea";
import { useRef, useEffect } from "react";
import PageError from "components/atoms/PageError";
import Tooltip from "components/atoms/Tooltip";
import PageHeader from "components/atoms/PageHeader";
import { EcosystemResponseInterface } from "types/business";
import FieldEcosystemMultiInput from "components/molecules/FieldEcosystemMultiInput";
import WithAuth from "components/atoms/WithAuth";
import FieldPriceInput from "components/atoms/FieldPriceInput";
import listOfCountries from "../../src/data/listOfCountries";
import FAQInput from "components/molecules/FAQInput";
import TierPriceInput from "components/molecules/TierpriceInput";
import { CategoryInterface } from "types/category";
import _ from "lodash";
import SectionCard from "components/atoms/SectionCard";
import SectionHeader from "components/atoms/SectionHeader";
import ImageUploader from "components/molecules/ImageUploader";
import ValidationErrorMsg from "components/atoms/ValidationErrorMsg";
import { Grid, Box,Checkbox,ButtonGroup } from "@chakra-ui/core";
import Button, { ButtonType } from "components/atoms/Button"

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
    const filteredSkuValues = values.skus.map((sku) => {
      const imageUrls = sku.images?.map((image) => image.url);
      const filteredSku = _.omit(sku, "images");
      return {
        ...filteredSku,
        imageRelativePaths: imageUrls,
      };
    });

    const filteredValues = _.omit(values, "skus");

    const filteredProduct: ProductInputInterface = {
      ...filteredValues,
      skus: filteredSkuValues as ProductSkuDetail[],
    };

    props.addProduct(filteredProduct);
  };

  return (
    <Box px={2}>
      <PageHeader>Add Product</PageHeader>
      <Box maxW="1200px" m="auto">
        <Formik
          innerRef={formikRef}
          initialValues={{
            isActive: true,
            name: "",
            shortDescription: "",
            longDescription: "",
            hsnCode: "",
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
              <Grid
                templateColumns={["1fr","200px 1fr"]}
                alignItems="center"
                fontSize="md"
                maxW=" 700px"
                margin="auto"
              >
                <InputLabel label="Is Active" />
                <Field name="isActive">
                  {({ field }) => (
                    <Checkbox
                      isChecked={values.isActive}
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
                <InputLabel label="Min Price" />
                <Tooltip
                  trigger="focus"
                  tooltip="Minimum price after all discounts"
                >
                  <FieldPriceInput name="minPrice" />
                </Tooltip>
                <InputLabel label="Max Price" />
                <FieldPriceInput name="maxPrice" />
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

                <InputLabel label="Tax Group" />
                <FieldSelect
                  name="taxGroup"
                  options={taxGroups.map((taxGroup) => ({
                    value: taxGroup.id,
                    label: taxGroup.description,
                  }))}
                />
              </Grid>
              <SkuInputTable />
              {values.skus.map((sku, index) => (
                <div className="imageUploadContainer">
                  <SectionCard>
                    <SectionHeader>
                      SKU Id: {sku.skuId}(
                      {sku.attributeValueIds
                        .map(
                          (attributeValueId) =>
                            attributeValueId.attributeName +
                            ":" +
                            attributeValueId.value
                        )
                        .join(", ")}
                      )
                    </SectionHeader>
                    <ImageUploader
                      value={values.skus[index].images}
                      onChange={(images) => {
                        setFieldValue(`skus.${index}.images`, images);
                      }}
                    />
                    <ErrorMessage
                      component={ValidationErrorMsg}
                      name={`skus.${index}.images`}
                    />
                  </SectionCard>
                </div>
              ))}
              <TierPriceInput />
              <FAQInput />
              <SpecificationInput />
             <ButtonGroup>
                <Button
                  disabled={values.skus.some((sku) =>
                    sku.images.some((image) => image.isUploading)
                  )}
                  type={ButtonType.success}
                  isSubmitButton={true}
                >
                  Submit
                </Button>
                <Button
                  disabled={values.skus.some((sku) =>
                    sku.images.some((image) => image.isUploading)
                  )}
                  onClick={resetForm}
                  type={ButtonType.success}
                  outlined={true}
                >
                  Clear
                </Button>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
        <AttributeModal categories={categories} />
      </Box>
    </Box>
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
