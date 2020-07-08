import { Formik, Form } from "formik";
import Button from "../../src/components/Button";
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
import { CouponInputInterface } from "../../src/types/coupon";

interface DispatchProps {
  createCoupon: () => void;
}

type CreateCouponProps = DispatchProps;

export const couponSchema = Yup.object().shape({
  categories: Yup.array().of(Yup.object()),
});

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

  const onSubmit = (values: CouponInputInterface, { resetForm }) => {
    props.createCoupon();
    resetForm();
  };

  return (
    <div className="container">
      <header>Create Coupon</header>

      <Formik
        initialValues={{
          products: [],
          categories: [],
        }}
        validationSchema={couponSchema}
        onSubmit={onSubmit}
      >
        {({ values, resetForm }) => (
          <div className="formContainer">
            <Form>
              <SelectProductSkus />
              <div className="gridContainer">
                <InputLabel label="Categories" />
                <FieldMultiSelect
                  name="categories"
                  options={categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                  }))}
                />
              </div>
              <div>
                <Button isSubmitButton={true}>Submit</Button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
      <style jsx>{`
        header {
          margin: 1em 0;
          font-weight: bold;
          font-size: 1.3rem;
          text-transform: uppercase;
        }
        .container {
          margin: 1em;
          min-width: 270px;
        }
        .addValueButtonContainer {
          font-size: 0.9rem;
        }
        .gridContainer {
          display: grid;
          grid-template-columns: 200px 1fr;
          align-items: center;
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
