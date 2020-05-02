import Modal from "./Modal";
import Button from "./Button";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import { getReasonModalData } from "../selectors/ui";
import UIActions from "../actions/ui";
import { ReasonModalData } from "../types/ui";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import RadioButton from "./RadioButton";
import { splitCamelCase } from "../utils/misc";

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
        <header>{props.data.header}</header>
        <div className="subHeader">{props.data.subHeader}</div>
        <Formik
          initialValues={{
            reason: props.data.reasons[0],
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object().shape({
            reason: Yup.string().required("Reason is requied"),
          })}
          enableReinitialize={true}
        >
          {() => (
            <Form>
              <Field name="reason">
                {({ field }) => (
                  <div>
                    {props.data.reasons.map((reason) => (
                      <div>
                        <RadioButton
                          label={splitCamelCase(reason)}
                          value={reason}
                          checked={field.value === reason}
                          onChange={(value) => {
                            field.onChange({
                              target: {
                                name: "reason",
                                value: reason,
                              },
                            });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </Field>
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
          margin: 0.8em 0;
        }
        .container {
          margin: 1em;
          min-width: 270px;
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
