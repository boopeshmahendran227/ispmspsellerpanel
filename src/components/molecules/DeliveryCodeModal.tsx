import { connect } from "react-redux";
import { RootState } from "../../reducers";
import { getDeliveryCodeModalOpen } from "../../selectors/ui";
import UIActions from "../../actions/ui";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FieldInput from "../atoms/FieldInput";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  Heading,
} from "@chakra-ui/core";

interface StateProps {
  open: boolean;
}

interface DispatchProps {
  onSubmit: (deliveryCode: string) => void;
  onCancel: () => void;
}

type DeliveryCodeModalProps = StateProps & DispatchProps;

const DeliveryCodeModal = (props: DeliveryCodeModalProps) => {
  const handleSubmit = (values, { resetForm }) => {
    props.onSubmit(values.deliveryCode);
    resetForm();
  };

  return (
    <Modal isOpen={props.open} onClose={props.onCancel} size="sm" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius={10}>
        <ModalHeader>Delivery Code</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Heading color="secondaryTextColor" size="sm">
            Enter Delivery Code to Mark as Delivered
          </Heading>
          <Formik
            initialValues={{
              deliveryCode: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              deliveryCode: Yup.string().required("Delivery Code is required"),
            })}
            enableReinitialize={true}
          >
            {() => (
              <Form>
                <FieldInput name="deliveryCode" />
                <Box textAlign="center" my={3}>
                  <Button type="submit" variantColor="primaryColorVariant">
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  open: getDeliveryCodeModalOpen(state),
});

const mapDispatchToProps: DispatchProps = {
  onSubmit: UIActions.deliveryCodeModalSubmitClicked,
  onCancel: UIActions.deliveryCodeModalCancelClicked,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryCodeModal);
