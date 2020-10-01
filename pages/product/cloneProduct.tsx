import React from "react";
import PageContainer from "components/atoms/PageContainer";
import PageHeaderContainer from "components/atoms/PageHeaderContainer";
import PageHeader from "components/PageHeader";
import { Formik, Form } from "formik";
import FieldInput from "components/molecules/FieldInput";
import FieldSelect from "components/molecules/FieldSelect";
import InputLabel from "components/InputLabel";
import * as Yup from "yup";
import Button, { ButtonType } from "components/atoms/Button";
import EcosystemOption from "components/atoms/EcosystemOption";
import useSWR from "swr";
import { EcosystemResponseInterface } from "types/business";
import PageError from "components/atoms/PageError";
import Loader from "components/atoms/Loader";
import { SelectOptionInterface, ProductCloneInterface } from "types/product";
import ProductActions from "actions/product";
import WithAuth from "components/WithAuth";
import { connect } from "react-redux";

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
    <PageContainer>
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
            <div className="gridContainer">
              <InputLabel label="Current Ecosystem" />
              <FieldSelect
                name="currentEcosystem"
                options={currentEcosystems}
              />

              <InputLabel label="Seller Id" />
              <FieldInput name="sellerId" />
              <InputLabel label="Target Ecosystem" />
              <FieldSelect name="targetEcosystem" options={targetEcosystems} />
            </div>
            <div className="buttonContainer">
              <Button type={ButtonType.success} isSubmitButton={true}>
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <style jsx>{`
        .gridContainer {
          display: grid;
          grid-template-columns: 200px 300px;
          align-items: center;
        }
        .buttonContainer {
          padding-top: 1em;
          padding-bottom: 0.4em;
          font-size: 1.1rem;
          margin-left: 400px;
        }
      `}</style>
    </PageContainer>
  );
};

const mapDispatchToProps: DispatchProps = {
  cloneProduct: ProductActions.cloneProduct,
};
export default WithAuth(
  connect<null, DispatchProps>(null, mapDispatchToProps)(CloneProduct)
);
