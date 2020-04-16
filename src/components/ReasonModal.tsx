import Modal from "./Modal";
import Button from "./Button";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import { getReasonModalData } from "../selectors/ui";
import UIActions from "../actions/ui";
import { ReasonModalData } from "../types/ui";
import CSSConstants from "../constants/CSSConstants";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FieldTextArea from "../components/FieldTextArea";

interface StateProps {
  data: ReasonModalData;
}

interface DispatchProps {
  onClose: () => void;
}

type ReasonModalProps = StateProps & DispatchProps;

const ReasonModal = (props: ReasonModalProps) => {
  const handleSubmit = (values) => {
    props.data.onSubmit(values.reason);
    props.onClose();
  };

  return (
    <Modal open={props.data.open} onClose={props.onClose}>
      <div className="container">
        <header>Cancel Order</header>
        <Formik
          initialValues={{
            reason: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object().shape({
            reason: Yup.string().required("Reason is requied"),
          })}
        >
          {() => (
            <Form>
              <FieldTextArea
                id="reason"
                placeholder="Reason for cancellation"
                name="reason"
              />
              <div className="note">(Note: This action is irreversible)</div>
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
        .container {
          margin: 1em;
          min-width: 270px;
        }
        .note {
          margin: 0.4em 0;
          color: ${CSSConstants.dangerColor};
        }
      `}</style>
    </Modal>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  data: getReasonModalData(state),
});

const mapDispatchToProps: DispatchProps = {
  onClose: UIActions.hideReasonModal,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(ReasonModal);
