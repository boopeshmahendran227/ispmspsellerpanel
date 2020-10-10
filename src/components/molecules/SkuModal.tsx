import { useState, useEffect } from "react";
import SelectAttributes from "./SelectAttributes";
import SelectAttributeValues from "./SelectAttributeValues";
import { getSkuModalOpen } from "../../selectors/ui";
import { connect } from "react-redux";
import UIActions from "../../actions/ui";
import ProductActions from "../../actions/product";
import { RootState } from "../../reducers";
import {
  SelectedAttribute,
  AttributeValueInterface,
  SelectedAttributeValuesMap,
} from "../../types/product";
import _ from "lodash";
import {
  getSelectedAttributeValues,
  getSelectedAttributes,
} from "../../selectors/product";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  ButtonGroup,
} from "@chakra-ui/core";

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
    <Modal isOpen={open} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent borderRadius={10}>
        <ModalHeader>Create SKUs</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={5}>
          <Box>{steps[currentStep]}</Box>
          <Box textAlign="center">
            <ButtonGroup spacing={3}>
              <Button
                onClick={() => setCurrentStep(currentStep - 1)}
                isDisabled={getBackButtonDisabled()}
                variant="outline"
                variantColor="primaryColorVariant"
              >
                Back
              </Button>
              {currentStep === 0 && (
                <Button
                  variantColor="primaryColorVariant"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  isDisabled={getNextButtonDisabled()}
                >
                  Next
                </Button>
              )}
              {currentStep === 1 && (
                <Button
                  variantColor="primaryColorVariant"
                  onClick={handleGenerate}
                  isDisabled={getCreateDisabled()}
                >
                  Create
                </Button>
              )}
            </ButtonGroup>
          </Box>
        </ModalBody>
      </ModalContent>
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
