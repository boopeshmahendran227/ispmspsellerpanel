import Modal from "./Modal";
import Button from "./Button";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import { Formik, Form } from "formik";
import UIActions from "../actions/ui";
import CreditActions from "../actions/credit";
import * as Yup from "yup";
import InputLabel from "./InputLabel";
import FieldPriceInput from "./FieldPriceInput";
import { InvoiceInterface } from "../types/invoice";
import { getCurrentInvoice } from "../selectors/invoice";
import { getUpdateCreditsModalOpen } from "../selectors/ui";

interface StateProps {
  open: boolean;
  currentInvoice: InvoiceInterface;
}

interface DispatchProps {
  updateCreditsRequest: (invoiceId: number, creditsPaid: number) => void;
  onClose: () => void;
}

type UpdateCreditsModalProps = StateProps & DispatchProps;

const validationSchema = Yup.object().shape({
  creditsPaid: Yup.number(),
});

const UpdateCreditsModal = (props: UpdateCreditsModalProps) => {
  const { currentInvoice } = props;

  if (!currentInvoice) {
    // Return empty modal
    return (
      <Modal open={props.open} onClose={props.onClose}>
        <div></div>
      </Modal>
    );
  }

  const onSubmit = (values, { resetForm }) => {
    props.updateCreditsRequest(currentInvoice.invoiceId, values.creditsPaid);
    props.onClose();
    resetForm();
  };

  const handleCancelClicked = () => {
    props.onClose();
  };

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <div className="container">
        <header>Update Credits For Invoice #{currentInvoice.invoiceId}</header>
        <Formik
          initialValues={{
            creditsPaid: 0,
          }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {() => (
            <Form>
              <div className="gridContainer">
                <InputLabel label="Paid Credits" />
                <FieldPriceInput name="creditsPaid" />
              </div>
              <div className="buttonContainer">
                <Button isSubmitButton={true}>Update Pending Credits</Button>
                <Button outlined={true} onClick={handleCancelClicked}>
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <style jsx>{`
        .container {
          margin: 1em;
          min-width: 450px;
        }
        header {
          margin: 1em 0;
          font-weight: bold;
          font-size: 1.3rem;
          text-transform: uppercase;
        }
        .gridContainer {
          display: grid;
          grid-template-columns: 200px 300px;
          align-items: center;
        }
        .buttonContainer {
          margin-top: 1em;
          text-align: right;
        }
      `}</style>
    </Modal>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  open: getUpdateCreditsModalOpen(state),
  currentInvoice: getCurrentInvoice(state),
});

const mapDispatchToProps: DispatchProps = {
  updateCreditsRequest: CreditActions.updateCreditsRequest,
  onClose: UIActions.hideUpdateCreditsModal,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(UpdateCreditsModal);
