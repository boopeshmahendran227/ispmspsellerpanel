import React from "react";
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
import { Box, SimpleGrid, Heading, Stack } from "@chakra-ui/core";
import Button from "components/atoms/Button";

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
    <Stack
      maxW="600px"
      mx={[2, "auto"]}
      my={[1, 10]}
      p={4}
      boxShadow="md"
      bg="foregroundColor.500"
      shouldWrapChildren
      spacing={5}
    >
      <Heading size="md" mb={5}>
        Product Clone
      </Heading>
      <Formik
        initialValues={{
          currentEcosystem: null,
          sellerId: "",
          targetEcosystem: null,
        }}
        onSubmit={onSubmit}
        validationSchema={ProductSchema}
      >
        {() => (
          <Form>
            <SimpleGrid columns={[1, 2]} alignItems="center">
              <InputLabel label="Current Ecosystem" />
              <FieldSelect
                name="currentEcosystem"
                options={currentEcosystems}
              />
              <InputLabel label="Seller Id" />
              <FieldInput name="sellerId" />
              <InputLabel label="Target Ecosystem" />
              <FieldSelect name="targetEcosystem" options={targetEcosystems} />
            </SimpleGrid>
            <Box pt={1} pb={1} fontSize="md" textAlign="right">
              <Button type="submit" variantColor="successColorVariant">
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};

const mapDispatchToProps: DispatchProps = {
  cloneProduct: ProductActions.cloneProduct,
};
export default WithAuth(
  connect<null, DispatchProps>(null, mapDispatchToProps)(CloneProduct)
);
