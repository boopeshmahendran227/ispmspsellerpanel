import Modal from "../atoms/Modal";
import { connect } from "react-redux";
import { Formik, Form, ArrayHelpers } from "formik";
import FieldInput from "components/atoms/FieldInput";
import FieldTextArea from "components/atoms/FieldTextArea";
import Button from "../atoms/Button";
import { AddAttributeInterface, AttributeType } from "../../types/product";
import { RootState } from "../../reducers";
import { getAttributeModalOpen } from "../../selectors/ui";
import UIActions from "../../actions/ui";
import ProductActions from "../../actions/product";
import InputLabel from "../atoms/InputLabel";
import * as Yup from "yup";
import { useRef } from "react";
import { CategoryInterface } from "../../types/category";
import FieldMultiSelect from "./FieldMultiSelect";
import FieldEditableArray from "./FieldEditableArray";

interface StateProps {
  open: boolean;
}

interface DispatchProps {
  addAttribute: (attribute: AddAttributeInterface) => void;
  onClose: () => void;
}

interface OwnProps {
  categories: CategoryInterface[];
}

type AttributeModalProps = OwnProps & StateProps & DispatchProps;

export const attributeSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  values: Yup.array().of(Yup.string()).min(1),
  associatedCategories: Yup.array().of(Yup.object()).min(1),
});

const AttributeModal = (props: AttributeModalProps) => {
  const { open, categories } = props;
  const resetFormRef = useRef<any>();

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
            associatedCategories: [],
          }}
          validationSchema={attributeSchema}
          onSubmit={onSubmit}
        >
          {({ resetForm }) => (
            <div className="formContainer">
              <Form>
                {(resetFormRef.current = resetForm)}
                <div className="gridContainer">
                  <InputLabel label="Name" />
                  <FieldInput name="name" />
                  <InputLabel label="Associated Categories" />
                  <FieldMultiSelect
                    name="associatedCategories"
                    options={categories.map((category) => ({
                      value: category.id,
                      label: category.name,
                    }))}
                  />
                  <InputLabel label="Description" />
                  <FieldTextArea name="description" />
                  <InputLabel label="Values" />
                  <FieldEditableArray
                    headers={["S.no", "Value"]}
                    name="values"
                    onAdd={(arrayHelpers: ArrayHelpers) => {
                      arrayHelpers.push("");
                    }}
                    renderInputRow={(index: number) => (
                      <>
                        <td>{index + 1}</td>
                        <td>
                          <FieldInput name={`values.${index}`} />
                        </td>
                      </>
                    )}
                    label="Value"
                  />
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
          align-items: center;
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
