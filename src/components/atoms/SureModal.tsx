import { connect } from "react-redux";
import { RootState } from "../../reducers";
import { getSureModalData } from "../../selectors/ui";
import UIActions from "../../actions/ui";
import { SureModalData } from "../../types/ui";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  Box,
} from "@chakra-ui/core";
import React from "react";
import Button from "components/atoms/Button";

interface StateProps {
  data: SureModalData;
}

interface DispatchProps {
  onSureClicked: () => void;
  onCancelClicked: () => void;
}

type SureModalProps = StateProps & DispatchProps;

const SureModal = (props: SureModalProps) => {
  const handleSureClicked = () => {
    props.onSureClicked();
  };

  const handleCancelClicked = () => {
    props.onCancelClicked();
  };

  return (
    <Modal
      isOpen={props.data.open}
      onClose={props.onCancelClicked}
      size="sm"
      isCentered
    >
      <ModalOverlay />
      <ModalContent borderRadius={10}>
        <ModalHeader fontSize={["md", "xl"]}>{props.data.header}</ModalHeader>
        <ModalCloseButton
          _focus={{ boxShadow: "none" }}
          _hover={{ color: "dangerColorVariant.500",transform: "rotate(90deg)"}}
          size="lg"
        />
        <ModalBody>
          <Box>{props.data.body}</Box>
          <Box color="dangerColor" my={2} fontSize={["xs", "md"]}>
            (Note: This action is irreversible)
          </Box>
          <Stack
            isInline
            shouldWrapChildren
            textAlign="center"
            spacing={3}
            my={3}
          >
            <Button
              variantColor="primaryColorVariant"
              onClick={handleSureClicked}
            >
              Yes, Sure
            </Button>
            <Button
              variant="outline"
              variantColor="dangerColorVariant"
              onClick={handleCancelClicked}
            >
              No, Close
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  data: getSureModalData(state),
});

const mapDispatchToProps: DispatchProps = {
  onSureClicked: UIActions.sureModalSureClicked,
  onCancelClicked: UIActions.sureModalCancelClicked,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(SureModal);
