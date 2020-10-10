import React from "react";
import PageContainer from "components/atoms/PageContainer";
import PageHeaderContainer from "components/atoms/PageHeaderContainer";
import PageHeader from "components/atoms/PageHeader";
import { Formik, Form } from "formik";
import FieldInput from "components/atoms/FieldInput";
import FieldSelect from "components/molecules/FieldSelect";
import InputLabel from "components/atoms/InputLabel";
import * as Yup from "yup";
import EcosystemOption from "components/atoms/EcosystemOption";
import useSWR from "swr";
import { EcosystemResponseInterface } from "types/business";
import PageError from "components/atoms/PageError";
import Loader from "components/atoms/Loader";
import { SelectOptionInterface, ProductCloneInterface } from "types/product";
import ProductActions from "actions/product";
import WithAuth from "components/atoms/WithAuth";
import { connect } from "react-redux";
import { Box, Grid, Button } from "@chakra-ui/core";
import PageBodyContainer from "components/atoms/PageBodyContainer";

interface DispatchProps {
  cloneProduct: (product: ProductCloneInterface) => void;
}

type CloneProductProps = DispatchProps;

const ProductSchema = Yup.object().shape({
  currentEcosystem: Yup.object()
    .required("Current ecosystem is required")
    .nullable(),
  sellerId: Yup.string().required(),
  targetEcosystem: Yup.object()
    .required("Target ecosystem is required")
    .nullable(),
});

const CloneProduct = (props: CloneProductProps) => {
  const businessSWR = useSWR<EcosystemResponseInterface>(
    "/businesses/ecosystems/all"
  );
  const ecosystemData: EcosystemResponseInterface | undefined =
    businessSWR.data;

  const sellerEcosystemSWR = useSWR("/ecosystem/seller");
  const sellerEcosystemData = sellerEcosystemSWR.data;

  const error = businessSWR.error || sellerEcosystemSWR.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!ecosystemData || !sellerEcosystemData) {
    return <Loader />;
  }

  const onSubmit = (values) => {
    props.cloneProduct({
      currentEcosystem: values.currentEcosystem,
      sellerId: values.sellerId,
      targetEcosystem: values.targetEcosystem,
    });
  };

  const targetEcosystems: SelectOptionInterface[] = ecosystemData.map(
    (ecosystem) => ({
      value: ecosystem._id,
      label: <EcosystemOption ecosystem={ecosystem} />,
    })
  );

  const currentEcosystems: SelectOptionInterface[] = sellerEcosystemData.map(
    (ecosystem) => ({
      value: ecosystem.id,
      label: ecosystem.name,
    })
  );

  return (
    <Box
      maxW="600px"
      mx="auto"
      my={10}
      p={6}
      boxShadow="md"
      bg="foregroundColor"
    >
      <PageHeaderContainer>
        <PageHeader>Product Clone</PageHeader>
      </PageHeaderContainer>

      <Formik
        initialValues={{
          currentEcosystem: null,
          sellerId: "",
          targetEcosystem: null,
        }}
        onSubmit={onSubmit}
        validationSchema={ProductSchema}
      >
        {({ values }) => (
          <Form>
            <Grid templateColumns=" 200px 300px" alignItems="center">
              <InputLabel label="Current Ecosystem" />
              <FieldSelect
                name="currentEcosystem"
                options={currentEcosystems}
              />

              <InputLabel label="Seller Id" />
              <FieldInput name="sellerId" />
              <InputLabel label="Target Ecosystem" />
              <FieldSelect name="targetEcosystem" options={targetEcosystems} />
            </Grid>
            <Box pt="1em" pb=" 0.4em" fontSize="1.1rem" ml="400px">
              <Button type="submit" variantColor="successColorVariant">
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const mapDispatchToProps: DispatchProps = {
  cloneProduct: ProductActions.cloneProduct,
};
export default WithAuth(
  connect<null, DispatchProps>(null, mapDispatchToProps)(CloneProduct)
);
