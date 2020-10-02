import { useState } from "react";
import useSWR from "swr";
import { Formik, Form } from "formik";
import Button, { ButtonType } from "components/atoms/Button";
import InputLabel from "components/atoms/InputLabel";
import CouponActions from "actions/coupon";
import { connect } from "react-redux";
import WithAuth from "components/WithAuth";
import {
  CouponInputInterface,
  CouponType,
  CouponRequestInterface,
} from "types/coupon";
import RadioButton from "components/atoms/RadioButton";
import FieldPriceInput from "components/molecules/FieldPriceInput";
import FieldPercentageInput from "components/molecules/FieldPercentageInput";
import FieldDatePicker from "components/molecules/FieldDatePicker";
import moment from "moment";
import BackLink from "components/atoms/BackLink";
import PageError from "components/atoms/PageError";
import CSSConstants from "../../src/constants/CSSConstants";
import {
  EcosystemResponseInterface,
  EcosystemDataInterface,
} from "types/business";
import Loader from "components/atoms/Loader";
import { SelectOptionInterface } from "types/product";
import EcosystemOption from "components/atoms/EcosystemOption";
import FieldSelect from "components/molecules/FieldSelect";
import FieldInput from "components/molecules/FieldInput";
import api from "../../src/api";

interface DispatchProps {
  createCoupon: (couponData: CouponRequestInterface) => void;
}

type CreateCouponProps = DispatchProps;

const CreateCoupon = (props: CreateCouponProps) => {
  const [isCheckingCouponCode, setIsCheckingCouponCode] = useState(false);
  const ecosystemSWR = useSWR("/businesses/ecosystems/all");
  const ecosystemData: EcosystemResponseInterface = ecosystemSWR.data;

  const error = ecosystemSWR.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!ecosystemData) {
    return <Loader />;
  }

  const ecosystems: SelectOptionInterface[] = ecosystemData.map(
    (ecosystem: EcosystemDataInterface) => ({
      value: ecosystem._id,
      label: <EcosystemOption ecosystem={ecosystem} />,
    })
  );

  const onSubmit = (values: CouponInputInterface) => {
    props.createCoupon({
      ...(values.type === CouponType.FixedAmount && {
        discountValue: values.discountValue,
      }),
      ...(values.type === CouponType.Percentage && {
        discountPercentage: values.discountPercentage,
      }),
      couponCode: values.couponCode,
      minimumOrderAmount: values.minimumOrderAmount,
      startDate: values.startDate.format(),
      endDate: values.endDate.format(),
      ecosystemId: values.ecosystem?.value as string,
    });
  };

  const validateCouponCode = async (couponCode: string) => {
    setIsCheckingCouponCode(true);
    const res: boolean = await api("/sellercoupon/check", {
      method: "GET",
      params: { couponcode: couponCode },
    });

    setIsCheckingCouponCode(false);

    return res;
  };

  return (
    <div className="container">
      <BackLink href="/coupon">Back to Coupons</BackLink>
      <header>Create Coupon</header>
      <Formik
        initialValues={{
          couponCode: "",
          type: CouponType.FixedAmount,
          discountValue: 0,
          discountPercentage: 0,
          minimumOrderAmount: 0,
          startDate: moment(),
          endDate: moment(),
          ecosystem: null,
        }}
        validate={async (values) => {
          const errors: any = {};

          if (values.couponCode === "") {
            errors.couponCode = "Coupon Code is required";
          } else {
            const isCouponCodeValid = await validateCouponCode(
              values.couponCode
            );

            if (!isCouponCodeValid) {
              errors.couponCode =
                "Coupon Code already exists. Please enter another coupon code";
            }
          }

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
          if (values.ecosystem === null) {
            errors.ecosystem = "Ecosystem is required";
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
                <InputLabel label="Coupon Code" />
                <div className="inputContainer">
                  <FieldInput name="couponCode" />
                  {isCheckingCouponCode && (
                    <div className="couponLoader">
                      <Loader loaderWidth="1rem" width="1rem" height="1rem" />
                    </div>
                  )}
                </div>
                <InputLabel label="Coupon Discount Type" />
                <div className="discountTypeValuesContainer">
                  <div>
                    <RadioButton
                      label="Fixed Amount"
                      value={""}
                      checked={values.type === CouponType.FixedAmount}
                      onChange={(value) =>
                        setFieldValue("type", CouponType.FixedAmount)
                      }
                    />
                  </div>
                  <div>
                    <RadioButton
                      label="Percentage"
                      value={""}
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
                <InputLabel label="Ecosystem" />
                <FieldSelect name="ecosystem" options={ecosystems} />
                <InputLabel label="Minimum Order Amount" />
                <FieldPriceInput name="minimumOrderAmount" />
                <InputLabel label="Valid From" />
                <FieldDatePicker name="startDate" />
                <InputLabel label="Valid Till" />
                <FieldDatePicker name="endDate" />
              </div>
              <div className="buttonContainer">
                <Button
                  disabled={isCheckingCouponCode}
                  type={ButtonType.success}
                  isSubmitButton={true}
                >
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
          background: ${CSSConstants.foregroundColor};
        }
        .inputContainer {
          position: relative;
        }
        .couponLoader {
          position: absolute;
          top: 50%;
          right: 5%;
          transform: translateY(-50%);
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
