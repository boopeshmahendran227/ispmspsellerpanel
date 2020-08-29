import Modal from "./Modal";
import { useState, useEffect } from "react";
import Button, { ButtonType } from "./atoms/Button";
import SelectAttributes from "./SelectAttributes";
import SelectAttributeValues from "./SelectAttributeValues";
import { getSkuModalOpen } from "../selectors/ui";
import { connect } from "react-redux";
import UIActions from "../actions/ui";
import ProductActions from "../actions/product";
import { RootState } from "../reducers";
import {
  SelectedAttribute,
  AttributeValueInterface,
  SelectedAttributeValuesMap,
} from "../types/product";
import _ from "lodash";
import {
  getSelectedAttributeValues,
  getSelectedAttributes,
} from "../selectors/product";

interface StateProps {
  selectedAttributes: SelectedAttribute[];
  selectedAttributeValues: SelectedAttributeValuesMap;
  open: boolean;
}

interface DispatchProps {
  onClose: () => void;
  setSelectedAttributes: (selectedAttributes: SelectedAttribute[]) => void;
  setSelectedAttributeValuesMap: (value: SelectedAttributeValuesMap) => void;
  showAttributeModal: () => void;
}

type SkuModalProps = StateProps & DispatchProps;

const SkuModal = (props: SkuModalProps) => {
  const { open, onClose } = props;
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAttributes, setSelectedAttributes] = useState<
    SelectedAttribute[]
  >([]);
  const [selectedAttributeValues, setSelectedAttributeValues] = useState<any>(
    {}
  );

  const steps = [
    <SelectAttributes
      selectedAttributes={selectedAttributes}
      setSelectedAttributes={(selectedAttributes: SelectedAttribute[]) => {
        setSelectedAttributes(selectedAttributes);

        // Set empty array for values if attribute id not present in the map
        setSelectedAttributeValues({
          ...selectedAttributes.reduce(
            (acc, attribute) => ({
              ...acc,
              [attribute.attributeId]: [],
            }),
            {}
          ),
          ...selectedAttributeValues,
        });
      }}
      showAttributeModal={props.showAttributeModal}
    />,
    <SelectAttributeValues
      selectedAttributes={selectedAttributes}
      selectedAttributeValues={selectedAttributeValues}
      setSelectedAttributeValues={(
        attributeId,
        values: AttributeValueInterface[]
      ) => {
        setSelectedAttributeValues({
          ...selectedAttributeValues,
          [attributeId]: values,
        });
      }}
    />,
  ];

  const handleGenerate = () => {
    // Copy to redux and reset
    props.setSelectedAttributes(selectedAttributes);
    props.setSelectedAttributeValuesMap(selectedAttributeValues);

    setSelectedAttributes([]);
    setSelectedAttributeValues({});

    props.onClose();
  };

  const getBackButtonDisabled = () => {
    return currentStep === 0;
  };

  const getNextButtonDisabled = () => {
    return selectedAttributes.length === 0;
  };

  const getCreateDisabled = () => {
    return _.values(selectedAttributeValues).some(
      (values) => values.length === 0
    );
  };

  // Reset state on open
  useEffect(() => {
    if (props.open) {
      setCurrentStep(0);
      setSelectedAttributes(props.selectedAttributes);
      setSelectedAttributeValues(props.selectedAttributeValues);
    }
  }, [props.open]);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="container">
        <header>Create SKUs</header>
        <div className="stepContainer">{steps[currentStep]}</div>
        <div className="buttonContainer">
          <Button
            type={ButtonType.primary}
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={getBackButtonDisabled()}
            outlined={true}
          >
            Back
          </Button>
          {currentStep === 0 && (
            <Button
              type={ButtonType.primary}
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={getNextButtonDisabled()}
            >
              Next
            </Button>
          )}
          {currentStep === 1 && (
            <Button
              type={ButtonType.primary}
              onClick={handleGenerate}
              disabled={getCreateDisabled()}
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
  selectedAttributeValues: getSelectedAttributeValues(state),
});

const mapDispatchToProps: DispatchProps = {
  setSelectedAttributes: ProductActions.setSelectedAttributes,
  setSelectedAttributeValuesMap: ProductActions.setSelectedAttributeValuesMap,
  onClose: UIActions.hideSkuModal,
  showAttributeModal: UIActions.showAttributeModal,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(SkuModal);
