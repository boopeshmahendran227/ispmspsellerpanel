import PageHeader from "components/PageHeader";
import { Formik, Form } from "formik";
import PageHeaderContainer from "components/atoms/PageHeaderContainer";
import useSWR from "swr";
import FieldMultiSelect from "components/FieldMultiSelect";
import FieldSelect from "components/FieldSelect";
import { PaymentMode } from "types/invoice";
import { ShipmentMode, SettingsInterface } from "types/settings";
import SectionCard from "components/SectionCard";
import SectionHeader from "components/atoms/SectionHeader";
import Button from "components/atoms/Button";
import PageError from "components/PageError";
import Loader from "components/Loader";
import SettingActions from "actions/settings";
import { connect } from "react-redux";
import * as Yup from "yup";
import { SelectOptionInterface } from "types/product";

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
    <div className="container">
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
              <label>Restricted Payment Modes</label>
              <FieldMultiSelect
                name="restrictedPaymentModes"
                options={paymentModeOptions}
              />
              <label>Shipment Mode</label>
              <FieldSelect name="shipmentMode" options={shipmentModeOptions} />
              <Button isSubmitButton={true}>Save</Button>
            </SectionCard>
          </Form>
        )}
      </Formik>
      <style jsx>{`
        .container {
          max-width: 600px;
          margin: auto;
        }
      `}</style>
    </div>
  );
};

const mapDispatchToProps: DispatchProps = {
  updateSettings: SettingActions.updateSettings,
};

export default connect<null, DispatchProps>(null, mapDispatchToProps)(Settings);
