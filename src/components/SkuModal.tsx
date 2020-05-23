import Modal from "./Modal";
import { useState } from "react";
import Button, { ButtonType } from "../../src/components/Button";
import SelectAttributes from "./SelectAttributes";
import SelectAttributeValues from "./SelectAttributeValues";

interface SkuModalProps {
  open: boolean;
  onClose: () => void;
}

const SkuModal = (props: SkuModalProps) => {
  const { open, onClose } = props;
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [<SelectAttributes />, <SelectAttributeValues />];

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

export default SkuModal;
