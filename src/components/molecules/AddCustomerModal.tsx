import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Grid,
  Heading,
} from "@chakra-ui/core";

interface AddCustomerModalProps {
  open: boolean;
  onClose: () => void;
}
const AddCustomerModal = (props: AddCustomerModalProps) => {
  return (
    <Modal
      isOpen={props.open}
      onClose={props.onClose}
      size={["xs", "sm"]}
      isCentered
    >
      <ModalOverlay />
      <ModalContent borderRadius={10}>
        <ModalHeader>Add Recipient</ModalHeader>
        <ModalCloseButton />
        <ModalBody>none</ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default AddCustomerModal;
