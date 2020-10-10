import { useState } from "react";
import useSWR from "swr";
import { Formik, Form } from "formik";
import InputLabel from "components/atoms/InputLabel";
import CouponActions from "actions/coupon";
import { connect } from "react-redux";
import WithAuth from "components/atoms/WithAuth";
import {
  CouponInputInterface,
  CouponType,
  CouponRequestInterface,
} from "types/coupon";
import RadioButton from "components/atoms/RadioButton";
import FieldPriceInput from "components/atoms/FieldPriceInput";
import FieldPercentageInput from "components/atoms/FieldPercentageInput";
import FieldDatePicker from "components/molecules/FieldDatePicker";
import moment from "moment";
import BackLink from "components/atoms/BackLink";
import PageError from "components/atoms/PageError";
import {
  EcosystemResponseInterface,
  EcosystemDataInterface,
} from "types/business";
import Loader from "components/atoms/Loader";
import { SelectOptionInterface } from "types/product";
import EcosystemOption from "components/atoms/EcosystemOption";
import FieldSelect from "components/molecules/FieldSelect";
import FieldInput from "components/atoms/FieldInput";
import api from "../../src/api";
import { Box, Heading, Grid, Button, ButtonGroup } from "@chakra-ui/core";

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
    <Box
      maxW="700px"
      mx="auto"
      my={10}
      p={6}
      boxShadow="md"
      bg="foregroundColor"
    >
      <BackLink href="/coupon">Back to Coupons</BackLink>
      <Heading
        size="xl"
        mt={3}
        mb={4}
        fontWeight="bold"
        fontSize="xl"
        textTransform="uppercase"
      >
        Create Coupon
      </Heading>
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
          <Box>
            <Form>
              <Grid templateColumns="200px 300px" alignItems="center">
                <InputLabel label="Coupon Code" />
                <Box position="relative">
                  <FieldInput name="couponCode" />
                  {isCheckingCouponCode && (
                    <Box
                      position="absolute"
                      top="50%"
                      right="5%"
                      transform="translateY(-50%)"
                    >
                      <Loader size="xs" loaderWidth="2px" />
                    </Box>
                  )}
                </Box>
                <InputLabel label="Coupon Discount Type" />
                <Box className="discountTypeValuesContainer">
                  <Box>
                    <RadioButton
                      label="Fixed Amount"
                      value={""}
                      checked={values.type === CouponType.FixedAmount}
                      onChange={(value) =>
                        setFieldValue("type", CouponType.FixedAmount)
                      }
                    />
                  </Box>
                  <Box>
                    <RadioButton
                      label="Percentage"
                      value={""}
                      checked={values.type === CouponType.Percentage}
                      onChange={(value) =>
                        setFieldValue("type", CouponType.Percentage)
                      }
                    />
                  </Box>
                </Box>
                <InputLabel label="Discount Value" />
                {values.type === CouponType.FixedAmount ? (
                  <FieldPriceInput name="discountValue" />
                ) : (
                  <FieldPercentageInput name="discountPercentage" />
                )}
                <InputLabel label="Minimum Order Amount" />
                <FieldPriceInput name="minimumOrderAmount" />
                <InputLabel label="Ecosystem" />
                <FieldSelect name="ecosystem" options={ecosystems} />
                <InputLabel label="Valid From" />
                <FieldDatePicker name="startDate" />
                <InputLabel label="Valid Till" />
                <FieldDatePicker name="endDate" />
              </Grid>
              <ButtonGroup spacing={4}>
                <Button
                  isDisabled={isCheckingCouponCode}
                  type="submit"
                  variantColor="successColorVariant"
                >
                  Submit
                </Button>
                <Button
                  variant="outline"
                  onClick={() => resetForm}
                  type="reset"
                  variantColor="dangerColorVariant"
                >
                  Clear
                </Button>
              </ButtonGroup>
            </Form>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

const mapDispatchToProps: DispatchProps = {
  createCoupon: CouponActions.createCoupon,
};

export default WithAuth(
  connect<null, DispatchProps>(null, mapDispatchToProps)(CreateCoupon)
);
