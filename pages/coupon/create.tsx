import { Formik, Form } from "formik";
import Button, { ButtonType } from "../../src/components/Button";
import InputLabel from "../../src/components/InputLabel";
import CouponActions from "../../src/actions/coupon";
import { connect } from "react-redux";
import WithAuth from "../../src/components/WithAuth";
import {
  CouponInputInterface,
  CouponType,
  CouponRequestInterface,
} from "../../src/types/coupon";
import RadioButton from "../../src/components/RadioButton";
import FieldPriceInput from "../../src/components/FieldPriceInput";
import FieldPercentageInput from "../../src/components/FieldPercentageInput";
import FieldDatePicker from "../../src/components/FieldDatePicker";
import moment from "moment";

interface DispatchProps {
  createCoupon: (couponData: CouponRequestInterface) => void;
}

type CreateCouponProps = DispatchProps;

const CreateCoupon = (props: CreateCouponProps) => {
  const onSubmit = (values: CouponInputInterface) => {
    props.createCoupon({
      ...(values.type === CouponType.FixedAmount && {
        discountValue: values.discountValue,
      }),
      ...(values.type === CouponType.Percentage && {
        discountPercentage: values.discountPercentage,
      }),
      minimumOrderAmount: values.minimumOrderAmount,
      startDate: values.startDate.format(),
      endDate: values.endDate.format(),
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
          minimumOrderAmount: 0,
          startDate: moment(),
          endDate: moment(),
        }}
        validate={(values) => {
          const errors: any = {};
          if (values.type === CouponType.FixedAmount && !values.discountValue) {
            errors.discountValue = "Discount Value is required";
          }
          if (
            values.type === CouponType.Percentage &&
            !values.discountPercentage
          ) {
            errors.discountPercentage = "Discount Percentage is required";
          }
          if (values.startDate === null) {
            errors.startDate = "Start date cannot be a past date";
          }
          if (values.endDate === null) {
            errors.endDate = "End date cannot be a past date";
          }
          if (values.endDate.isBefore(values.startDate)) {
            errors.endDate = "End Date should be greater than start date";
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
                <InputLabel label="Minimum Order Amount" />
                <FieldPriceInput name="minimumOrderAmount" />
                <InputLabel label="Valid From" />
                <FieldDatePicker name="startDate" />
                <InputLabel label="Valid Till" />
                <FieldDatePicker name="endDate" />
              </div>
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
