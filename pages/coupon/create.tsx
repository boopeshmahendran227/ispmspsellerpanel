import { Formik, Form } from "formik";
import Button, { ButtonType } from "../../src/components/Button";
import InputLabel from "../../src/components/InputLabel";
import * as Yup from "yup";
import FieldMultiSelect from "../../src/components/FieldMultiSelect";
import useSWR from "swr";
import { flattenCategoryTree } from "../../src/utils/categoryTree";
import Loader from "../../src/components/Loader";
import PageError from "../../src/components/PageError";
import { CategoryTreeInterface } from "../../src/types/categoryTree";
import CouponActions from "../../src/actions/coupon";
import { connect } from "react-redux";
import WithAuth from "../../src/components/WithAuth";
import SelectProductSkus from "../../src/components/SelectProductSkus";
import {
  CouponInputInterface,
  CouponType,
  CouponRequestInterface,
} from "../../src/types/coupon";
import RadioButton from "../../src/components/RadioButton";
import FieldPriceInput from "../../src/components/FieldPriceInput";
import FieldPercentageInput from "../../src/components/FieldPercentageInput";

interface DispatchProps {
  createCoupon: (couponData: CouponRequestInterface) => void;
}

type CreateCouponProps = DispatchProps;

const CreateCoupon = (props: CreateCouponProps) => {
  const categorySWR = useSWR("/category/tree");
  const categoryTree: CategoryTreeInterface = categorySWR.data;

  const error = categorySWR.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!categoryTree) {
    return <Loader />;
  }

  const categories = flattenCategoryTree(categoryTree);

  const onSubmit = (values: CouponInputInterface) => {
    props.createCoupon({
      ...(values.type === CouponType.FixedAmount && {
        discountValue: values.discountValue,
      }),
      ...(values.type === CouponType.Percentage && {
        discountPercentage: values.discountPercentage,
      }),
      categoryIds: values.categories.map((category) => Number(category.value)),
    });
  };

  return (
    <div className="container">
      <header>Create Coupon</header>

      <Formik
        initialValues={{
          type: CouponType.FixedAmount,
          discountValue: 0,
          discountPercentage: 0,
          products: [],
          categories: [],
        }}
        validate={(values) => {
          const errors: any = {};
          if (values.type === CouponType.FixedAmount) {
            errors.discountValue = "Discount Value is required";
          }
          if (values.type === CouponType.Percentage) {
            errors.discountPercentage = "Discount Percentage is required";
          }
          if (values.products.length === 0 && values.categories.length === 0) {
            errors.products = "Products/Categories is required";
            errors.categories = "Products/Categories is required";
          }
          return errors;
        }}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values, resetForm }) => (
          <div className="formContainer">
            <Form>
              <div className="gridContainer">
                <InputLabel label="Coupon Discount Type" />
                <div className="discountTypeValuesContainer">
                  <div>
                    <RadioButton
                      label="Fixed Amount"
                      value={null}
                      checked={values.type === CouponType.FixedAmount}
                      onChange={(value) =>
                        setFieldValue("type", CouponType.FixedAmount)
                      }
                    />
                  </div>
                  <div>
                    <RadioButton
                      label="Percentage"
                      value={null}
                      checked={values.type === CouponType.Percentage}
                      onChange={(value) =>
                        setFieldValue("type", CouponType.Percentage)
                      }
                    />
                  </div>
                </div>
                <InputLabel label="Discount Value" />
                {values.type === CouponType.FixedAmount ? (
                  <FieldPriceInput name="discountValue" />
                ) : (
                  <FieldPercentageInput name="discountPercentage" />
                )}
              </div>
              <SelectProductSkus />
              <div className="categoriesLabel">Categories</div>
              <FieldMultiSelect
                name="categories"
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
              <div className="buttonContainer">
                <Button type={ButtonType.success} isSubmitButton={true}>
                  Submit
                </Button>
                <Button
                  type={ButtonType.danger}
                  onClick={resetForm}
                  outlined={true}
                >
                  Clear
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
      <style jsx>{`
        .container {
          max-width: 700px;
          margin: 2em auto;
          padding: 1.3em;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
        }
        header {
          margin-top: 0.5em;
          margin-bottom: 1em;
          font-weight: bold;
          font-size: 1.3rem;
          text-transform: uppercase;
        }
        .addValueButtonContainer {
          font-size: 0.9rem;
        }
        .gridContainer {
          display: grid;
          grid-template-columns: 200px 300px;
          align-items: center;
        }
        .categoriesLabel {
          font-weight: bold;
          font-size: 1.2rem;
          padding: 0.3em;
          margin-bottom: 0.7em;
        }
        .buttonContainer {
          padding-top: 1em;
          padding-bottom: 0.4em;
          font-size: 1.1rem;
        }
      `}</style>
    </div>
  );
};

const mapDispatchToProps: DispatchProps = {
  createCoupon: CouponActions.createCoupon,
};

export default WithAuth(
  connect<null, DispatchProps>(null, mapDispatchToProps)(CreateCoupon)
);
