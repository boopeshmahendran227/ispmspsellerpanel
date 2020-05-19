import Modal from "./Modal";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import FieldInput from "../../src/components/FieldInput";
import Button from "../../src/components/Button";
import { AddAttributeInterface, AttributeType } from "../types/product";
import { RootState } from "../reducers";
import { getAttributeModalOpen } from "../selectors/ui";
import UIActions from "../actions/ui";
import ProductActions from "../actions/product";
import FieldMultiSelect from "./FieldMultiSelect";

interface StateProps {
  open: boolean;
}

interface DispatchProps {
  addAttribute: (attribute: AddAttributeInterface) => void;
  onClose: () => void;
}

type AttributeModalProps = StateProps & DispatchProps;

const AttributeModal = (props: AttributeModalProps) => {
  const { open, onClose } = props;

  const onSubmit = (values: AddAttributeInterface) => {
    props.addAttribute(values);
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
          onSubmit={onSubmit}
        >
          {() => (
            <div className="formContainer">
              <Form>
                <FieldInput name="name" label="Name" />
                <FieldInput name="description" label="Description" />
                <FieldMultiSelect name="values" label="Values" />
                <div>
                  <Button isSubmitButton={true}>Add</Button>
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
