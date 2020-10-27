import PageHeader from "components/atoms/PageHeader";
import { Formik, Form } from "formik";
import PageHeaderContainer from "components/atoms/PageHeaderContainer";
import useSWR from "swr";
import FieldMultiSelect from "components/molecules/FieldMultiSelect";
import FieldSelect from "components/molecules/FieldSelect";
import { PaymentMode } from "types/invoice";
import { ShipmentMode, SettingsInterface } from "types/settings";
import SectionCard from "components/atoms/SectionCard";
import SectionHeader from "components/atoms/SectionHeader";
import Button from "components/atoms/Button";
import PageError from "components/atoms/PageError";
import Loader from "components/atoms/Loader";
import SettingActions from "actions/settings";
import { connect } from "react-redux";
import * as Yup from "yup";
import { SelectOptionInterface } from "types/product";
import { Box, FormLabel } from "@chakra-ui/core";

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

type InputInterface = Yup.InferType<typeof validationSchema>;

interface DispatchProps {
  updateSettings: (settings: SettingsInterface) => void;
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

  const handleSubmit = (values: InputInterface) => {
    props.updateSettings({
      restrictedPaymentModes: values.restrictedPaymentModes.map(
        (mode) => mode.value as PaymentMode
      ),
      shipmentMode: values.shipmentMode.value as ShipmentMode,
    });
  };

  return (
    <Box maxW="600px" m={[2, "auto"]}>
      <PageHeaderContainer>
        <PageHeader>Settings</PageHeader>
      </PageHeaderContainer>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          restrictedPaymentModes: paymentModeOptions.filter(
            (option: SelectOptionInterface) =>
              settings.restrictedPaymentModes.includes(
                option.value as PaymentMode
              )
          ),
          shipmentMode: shipmentModeOptions.find(
            (option) => option.value == settings.shipmentMode
          ) as SelectOptionInterface,
        }}
        validationSchema={validationSchema}
      >
        {() => (
          <Form>
            <SectionCard>
              <SectionHeader>Payment & Shipping</SectionHeader>
              <FormLabel>Restricted Payment Modes</FormLabel>
              <FieldMultiSelect
                name="restrictedPaymentModes"
                options={paymentModeOptions}
              />
              <FormLabel>Shipment Mode</FormLabel>
              <FieldSelect name="shipmentMode" options={shipmentModeOptions} />
              <Button type="submit">Save</Button>
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
