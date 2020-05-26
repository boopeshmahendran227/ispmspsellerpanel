import Modal from "./Modal";
import { connect } from "react-redux";
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import FieldInput from "../../src/components/FieldInput";
import FieldTextArea from "../../src/components/FieldTextArea";
import Button from "../../src/components/Button";
import { AddAttributeInterface, AttributeType } from "../types/product";
import { RootState } from "../reducers";
import { getAttributeModalOpen } from "../selectors/ui";
import UIActions from "../actions/ui";
import ProductActions from "../actions/product";
import InputLabel from "./InputLabel";
import * as Yup from "yup";
import ValidationErrorMsg from "../components/ValidationErrorMsg";
import { useRef } from "react";

interface StateProps {
  open: boolean;
}

interface DispatchProps {
  addAttribute: (attribute: AddAttributeInterface) => void;
  onClose: () => void;
}

type AttributeModalProps = StateProps & DispatchProps;

export const attributeSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  values: Yup.array().of(Yup.string()).min(1),
});

const AttributeModal = (props: AttributeModalProps) => {
  const { open } = props;
  const resetFormRef = useRef(null);

  const onSubmit = (values: AddAttributeInterface, { resetForm }) => {
    props.addAttribute(values);
    resetForm();
    props.onClose();
  };

  const onClose = () => {
    resetFormRef.current?.();
    props.onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="container">
        <header>Create New Attribute</header>

        <Formik
          initialValues={{
            name: "",
            description: "",
            values: [],
            attributeType: AttributeType.Default,
          }}
          validationSchema={attributeSchema}
          onSubmit={onSubmit}
        >
          {({ values, resetForm }) => (
            <div className="formContainer">
              <Form>
                {(resetFormRef.current = resetForm)}
                <div className="gridContainer">
                  <InputLabel label="Name" />
                  <FieldInput name="name" />
                  <InputLabel label="Description" />
                  <FieldTextArea name="description" />
                  <InputLabel label="Values" />
                  <div className="valueInputContainer">
                    <FieldArray
                      name="values"
                      render={(arrayHelpers) => (
                        <>
                          <table>
                            {values.values.length > 0 && (
                              <thead>
                                <tr>
                                  <th>S.no</th>
                                  <th>Value</th>
                                </tr>
                              </thead>
                            )}
                            <tbody>
                              {values.values.map((value, index) => (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>
                                    <FieldInput name={`values.${index}`} />
                                  </td>
                                  <td>
                                    <button
                                      type="button"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <i
                                        className="fa fa-trash"
                                        aria-hidden="true"
                                      ></i>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div className="addValueButtonContainer">
                            <Button onClick={() => arrayHelpers.push("")}>
                              Add Value
                            </Button>
                          </div>
                        </>
                      )}
                    />
                    <ErrorMessage
                      component={ValidationErrorMsg}
                      name="values"
                    />
                  </div>
                </div>
                <div>
                  <Button isSubmitButton={true}>Submit</Button>
                </div>
              </Form>
            </div>
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
        .addValueButtonContainer {
          font-size: 0.9rem;
        }
        .gridContainer {
          display: grid;
          grid-template-columns: 200px 1fr;
        }
        .valueInputContainer {
          align-self: center;
        }
      `}</style>
    </Modal>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  open: getAttributeModalOpen(state),
});

const mapDispatchToProps: DispatchProps = {
  addAttribute: ProductActions.addAttribute,
  onClose: UIActions.hideAttributeModal,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(AttributeModal);
