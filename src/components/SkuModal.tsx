import Modal from "./Modal";
import { useState } from "react";
import Button, { ButtonType } from "../../src/components/Button";
import SelectAttributes from "./SelectAttributes";
import SelectAttributeValues from "./SelectAttributeValues";
import { getSkuModalOpen } from "../selectors/ui";
import { connect } from "react-redux";
import UIActions from "../actions/ui";
import ProductActions from "../actions/product";
import { RootState } from "../reducers";
import { getSelectedAttributes } from "../../src/selectors/product";
import { SelectedAttribute } from "../types/product";

interface StateProps {
  selectedAttributes: SelectedAttribute[];
  open: boolean;
}

interface DispatchProps {
  onClose: () => void;
  setSelectedAttributes: (selectedAttributes: SelectedAttribute[]) => void;
  showAttributeModal: () => void;
}

type SkuModalProps = StateProps & DispatchProps;

const SkuModal = (props: SkuModalProps) => {
  const { open, onClose } = props;
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    <SelectAttributes
      selectedAttributes={props.selectedAttributes}
      setSelectedAttributes={props.setSelectedAttributes}
      showAttributeModal={props.showAttributeModal}
    />,
    <SelectAttributeValues />,
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <div className="container">
        <header>Create SKUs</header>
        <div className="stepContainer">{steps[currentStep]}</div>
        <div className="buttonContainer">
          <Button
            type={ButtonType.primary}
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={currentStep === 0}
            outlined={true}
          >
            Back
          </Button>
          {currentStep === 0 && (
            <Button
              type={ButtonType.primary}
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={props.selectedAttributes.length === 0}
            >
              Next
            </Button>
          )}
          {currentStep === 1 && (
            <Button
              type={ButtonType.primary}
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Create
            </Button>
          )}
        </div>
      </div>
      <style jsx>{`
        .container {
          min-width: 500px;
          min-height: 500px;
        }
        header {
          font-size: 1.3rem;
          font-weight: bold;
        }
        header,
        .stepContainer {
          padding: 1em;
        }
        .buttonContainer {
          padding: 1em;
          text-align: center;
        }
      `}</style>
    </Modal>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  open: getSkuModalOpen(state),
  selectedAttributes: getSelectedAttributes(state),
});

const mapDispatchToProps: DispatchProps = {
  setSelectedAttributes: ProductActions.setSelectedAttributes,
  onClose: UIActions.hideSkuModal,
  showAttributeModal: UIActions.showAttributeModal,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(SkuModal);
