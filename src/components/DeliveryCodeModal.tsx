import Modal from "./Modal";
import Button from "components/atoms/Button";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import { getDeliveryCodeModalOpen } from "../selectors/ui";
import UIActions from "../actions/ui";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FieldInput from "../../src/components/FieldInput";
import CSSConstants from "../../src/constants/CSSConstants";

interface StateProps {
  open: boolean;
}

interface DispatchProps {
  onSubmit: (deliveryCode: string) => void;
  onCancel: () => void;
}

type DeliveryCodeModalProps = StateProps & DispatchProps;

const DeliveryCodeModal = (props: DeliveryCodeModalProps) => {
  const handleSubmit = (values, { resetForm }) => {
    props.onSubmit(values.deliveryCode);
    resetForm();
  };

  return (
    <Modal open={props.open} onClose={props.onCancel}>
      <div className="container">
        <header>Delivery Code</header>
        <div className="subHeader">
          Enter Delivery Code to Mark as Delivered
        </div>
        <Formik
          initialValues={{
            deliveryCode: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object().shape({
            deliveryCode: Yup.string().required("Delivery Code is required"),
          })}
          enableReinitialize={true}
        >
          {() => (
            <Form>
              <div className="gridContainer">
                <FieldInput name="deliveryCode" />
              </div>
              <div>
                <Button isSubmitButton={true}>Submit</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <style jsx>{`
        header {
          margin: 1em 0;
          font-weight: bold;
          font-size: 1.3rem;
          text-transform: uppercase;
        }
        .subHeader {
          font-weight: 500;
          font-size: 1.1rem;
          margin: 0.3em 0;
          color: ${CSSConstants.secondaryTextColor};
        }
        .container {
          margin: 1em;
          min-width: 270px;
        }
        .gridContainer {
          display: grid;
          grid-template-columns: 200px 1fr;
          align-items: center;
          font-size: 1.1rem;
        }
      `}</style>
    </Modal>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  open: getDeliveryCodeModalOpen(state),
});

const mapDispatchToProps: DispatchProps = {
  onSubmit: UIActions.deliveryCodeModalSubmitClicked,
  onCancel: UIActions.deliveryCodeModalCancelClicked,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryCodeModal);
