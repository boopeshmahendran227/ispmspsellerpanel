import PageHeader from "components/atoms/PageHeader";
import { Formik, Form, ArrayHelpers, FormikErrors } from "formik";
import PageHeaderContainer from "components/atoms/PageHeaderContainer";
import useSWR from "swr";
import FieldMultiSelect from "components/molecules/FieldMultiSelect";
import FieldSelect from "components/molecules/FieldSelect";
import { PaymentMode } from "types/invoice";
import {
  ShipmentMode,
  SettingsInterface,
  ManufacturerConfig,
} from "types/settings";
import SectionCard from "components/atoms/SectionCard";
import SectionHeader from "components/atoms/SectionHeader";
import Button from "components/atoms/Button";
import PageError from "components/atoms/PageError";
import Loader from "components/atoms/Loader";
import SettingActions from "actions/settings";
import { connect } from "react-redux";
import * as Yup from "yup";
import { SelectOptionInterface } from "types/product";
import { Box, FormLabel, Stack } from "@chakra-ui/core";
import React from "react";
import FieldEditableArray from "components/molecules/FieldEditableArray";
import FieldPercentageInput from "components/atoms/FieldPercentageInput";
import { OrderStatus } from "types/settings";
import _ from "lodash";

const validationSchema = Yup.object({
  restrictedPaymentModes: Yup.array()
    .of(
      Yup.object({
        value: Yup.string().defined(),
        label: Yup.string().defined(),
      }).defined()
    )
    .defined(),
  shipmentMode: Yup.object({
    value: Yup.string().defined(),
    label: Yup.string().defined(),
  }).defined(),
}).defined();

interface DispatchProps {
  updateSettings: (settings: SettingsInterface) => void;
}

interface ModifiedManufacturerConfig {
  orderState: SelectOptionInterface;
  advancePaymentPercentage: number;
}

interface InputInterface {
  restrictedPaymentModes: SelectOptionInterface[];
  shipmentMode: SelectOptionInterface;
  manufacturerConfig: ModifiedManufacturerConfig[];
  restrictedPincodes: string[];
}

type SettingsProps = DispatchProps;

const paymentModeOptions: SelectOptionInterface[] = [
  { value: PaymentMode.Cash, label: "Cash On Delivery" },
  { value: PaymentMode.Online, label: "Online" },
];

const shipmentModeOptions: SelectOptionInterface[] = [
  { value: ShipmentMode.Self, label: "Self" },
  { value: ShipmentMode.Shiprocket, label: "ShipRocket" },
];

const orderStatusOptions: SelectOptionInterface[] = [
  { value: OrderStatus.Created, label: "Created" },
  { value: OrderStatus.SellerProcessing, label: "SellerProcessing" },
  { value: OrderStatus.Shipping, label: "Shipping" },
  { value: OrderStatus.ShippingCompleted, label: "ShippingCompleted" },
  {
    value: OrderStatus.PackageReadyForCollection,
    label: "PackageReadyForCollection",
  },
];

const Settings = (props: SettingsProps): JSX.Element => {
  const swr = useSWR<SettingsInterface>("/seller/marketplaceconfig");
  const settings: SettingsInterface | undefined = swr.data;
  const error = swr.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!settings) {
    return <Loader />;
  }

  const getModifiedManufacturerConfig = (
    manufacturerConfig: ManufacturerConfig[]
  ): ModifiedManufacturerConfig[] =>
    manufacturerConfig.map(
      (config) =>
        orderStatusOptions
          .filter((status) => status.value === config.orderStateDto)
          .map((option) => {
            return {
              orderState: {
                ...option,
              },
              advancePaymentPercentage: config.advancePaymentPercentage,
            };
          })[0]
    );

  const handleSubmit = (values: InputInterface) => {
    props.updateSettings({
      restrictedPaymentModes: values.restrictedPaymentModes.map(
        (mode) => mode.value as PaymentMode
      ),
      shipmentMode: values.shipmentMode.value as ShipmentMode,
      restrictedPincodes: values.restrictedPincodes,
      manufacturerConfig: values.manufacturerConfig.map((config) => {
        return {
          orderStateDto: config.orderState.value as OrderStatus,
          advancePaymentPercentage: config.advancePaymentPercentage,
        };
      }),
    });
  };

  const validateManufacturerConfig = async (
    manufacturerConfig: ModifiedManufacturerConfig[]
  ) => {
    const errors: any = {};
    const totalpaymentPercentage: number = manufacturerConfig
      .map((config) => config.advancePaymentPercentage)
      .reduce((accumulator, currentValue) => accumulator + currentValue);

    if (
      _.uniq(manufacturerConfig.map((config) => config.orderState.value))
        .length !== manufacturerConfig.length
    ) {
      errors.manufacturerConfig =
        "Only one payment can be received per order state";
    }
    if (totalpaymentPercentage !== 100) {
      errors.manufacturerConfig =
        "Total payment percentage must be equal to 100";
    }
    return errors;
  };

  return (
    <Box maxW="600px" m={[2, "auto"]}>
      <PageHeaderContainer>
        <PageHeader>Settings</PageHeader>
      </PageHeaderContainer>
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={{
          restrictedPaymentModes: paymentModeOptions.filter(
            (option: SelectOptionInterface) =>
              settings.restrictedPaymentModes.includes(
                option.value as PaymentMode
              )
          ),
          restrictedPincodes: [],
          shipmentMode: shipmentModeOptions.find(
            (option) => option.value == settings.shipmentMode
          ) as SelectOptionInterface,
          manufacturerConfig: getModifiedManufacturerConfig(
            settings.manufacturerConfig
          ),
        }}
        validationSchema={validationSchema}
        validate={(values) =>
          validateManufacturerConfig(values.manufacturerConfig)
        }
      >
        {() => (
          <Form>
            <SectionCard>
              <SectionHeader>Payment & Shipping</SectionHeader>
              <Stack spacing={3} mt={3}>
                <Box>
                  <FormLabel>Restricted Payment Modes</FormLabel>
                  <FieldMultiSelect
                    name="restrictedPaymentModes"
                    options={paymentModeOptions}
                  />
                </Box>
                <Box>
                  <FormLabel>Shipment Mode</FormLabel>
                  <FieldSelect
                    name="shipmentMode"
                    options={shipmentModeOptions}
                  />
                </Box>
                <Box>
                  <FormLabel>Payment splits</FormLabel>
                  <FieldEditableArray
                    headers={["S.no", "Order status", "Payment percentage"]}
                    name="manufacturerConfig"
                    onAdd={(arrayHelpers: ArrayHelpers) => {
                      arrayHelpers.push({
                        orderState: {
                          label: "",
                          value: "",
                        },
                        advancePaymentPercentage: 0,
                      });
                    }}
                    renderInputRow={(index: number) => (
                      <>
                        <td>{index + 1}</td>
                        <Box as="td" w="250px">
                          <FieldSelect
                            options={orderStatusOptions}
                            name={`manufacturerConfig.${index}.orderState`}
                          />
                        </Box>
                        <td>
                          <FieldPercentageInput
                            name={`manufacturerConfig.${index}.advancePaymentPercentage`}
                          />
                        </td>
                      </>
                    )}
                    label="manufacturerConfig"
                  />
                </Box>
                <Box alignSelf="start">
                  <Button type="submit">Save</Button>
                </Box>
              </Stack>
            </SectionCard>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const mapDispatchToProps: DispatchProps = {
  updateSettings: SettingActions.updateSettings,
};

export default connect<null, DispatchProps>(null, mapDispatchToProps)(Settings);
