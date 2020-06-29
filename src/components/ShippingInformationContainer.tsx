import InputLabel from "./InputLabel";
import FieldInput from "./FieldInput";
import Button from "./Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import moment from "moment";
import DatePicker from "./DatePicker";
import CSSConstants from "../constants/CSSConstants";
import ValidationErrorMsg from "./ValidationErrorMsg";
import { connect } from "react-redux";
import OrderActions from "../actions/order";
import { OrderItemInterface } from "../types/order";

const validationSchema = Yup.object().shape({
  providerName: Yup.string().required("Provider Name is required"),
  trackingCode: Yup.string().required("Tracking Code is required"),
  expectedDeliveryDate: Yup.object().required(
    "Expected Delivery Date is required"
  ),
});

interface OwnProps {
  orderItem: OrderItemInterface;
}

interface DispatchProps {
  updateShippingInformation: (
    orderItemId: number,
    providerName: string,
    trackingCode: string,
    expectedDeliveryDate: string
  ) => void;
}

type ShippingInformationContainerProps = OwnProps & DispatchProps;

const ShippingInformationContainer = (
  props: ShippingInformationContainerProps
) => {
  const { orderItem } = props;
  const handleSubmit = (values) => {
    props.updateShippingInformation(
      orderItem.id,
      values.providerName,
      values.trackingCode,
      values.expectedDeliveryDate.format()
    );
  };

  return (
    <div className="container">
      <header>Shipping Information</header>
      <div className="body">
        <Formik
          initialValues={{
            providerName: orderItem.shipment.providerName || "",
            trackingCode: orderItem.shipment.trackingCode || "",
            expectedDeliveryDate: moment(
              orderItem.shipment.expectedDeliveryDate === "0001-01-01T00:00:00"
                ? undefined
                : orderItem.shipment.expectedDeliveryDate
            ),
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {() => (
            <Form>
              <div className="gridContainer">
                <InputLabel label="Provider Name" />
                <FieldInput name="providerName" />
                <InputLabel label="Tracking Code" />
                <FieldInput name="trackingCode" />
                <InputLabel label="Expected Delivery Date" />
                <Field name="expectedDeliveryDate">
                  {({ field }) => (
                    <>
                      <DatePicker
                        value={field.value}
                        onChange={(value) => {
                          field.onChange({
                            target: { name: field.name, value },
                          });
                        }}
                      />
                      <ErrorMessage
                        component={ValidationErrorMsg}
                        name={field.name}
                      />
                    </>
                  )}
                </Field>
              </div>
              <div>
                <Button isSubmitButton={true}>Update</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <style jsx>{`
        .container {
          border: ${CSSConstants.borderStyle};
          padding: 1em;
          margin: 2em 0;
          background: white;
        }
        header {
          font-weight: bold;
          font-size: 1.3rem;
          margin-bottom: 0.7em;
        }
        .gridContainer {
          display: grid;
          grid-template-columns: 200px 300px;
          align-items: center;
          font-size: 1.1rem;
          margin-bottom: 0.5em;
        }
      `}</style>
    </div>
  );
};

const mapDispatchToProps: DispatchProps = {
  updateShippingInformation: OrderActions.updateShippingInformation,
};

export default connect<null, DispatchProps>(
  null,
  mapDispatchToProps
)(ShippingInformationContainer);
