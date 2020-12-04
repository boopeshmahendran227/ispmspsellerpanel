import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/core";
import RadioButton from "components/atoms/RadioButton";
import Button from "../atoms/Button";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import ProductActions from "actions/product";

interface OwnProps {
  open: boolean;
  onClose: () => void;
}

interface DispatchProps {
  productStatus: (productStatus: boolean) => void;
}

type UpdateAllProductsStatusModalProps = OwnProps & DispatchProps;

const UpdateAllProductsStatusModal = (
  props: UpdateAllProductsStatusModalProps
) => {
  return (
    <Modal isOpen={props.open} onClose={props.onClose} size={["xs", "md"]}>
      <ModalOverlay />
      <ModalContent borderRadius={10} p={3}>
        <ModalHeader fontSize={["md", "lg"]}>
          Disable or Enable all products
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text color="dangerColor.500">
            Are you sure you want to disable or enable all your products?
          </Text>
          <Formik
            initialValues={{
              productStatus: true,
            }}
            onSubmit={(value) => {
              props.productStatus(value.productStatus), props.onClose();
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <Box mt={5}>
                  <RadioButton
                    label="Disable all products"
                    value={""}
                    checked={!values.productStatus}
                    onChange={(value) => setFieldValue("productStatus", false)}
                  />
                </Box>
                <Box mt={2}>
                  <RadioButton
                    label="Enable all products"
                    value={""}
                    checked={values.productStatus}
                    onChange={(value) => setFieldValue("productStatus", true)}
                  />
                </Box>
                <Box textAlign="right" mt={5}>
                  <Button type="submit">
                    {values.productStatus
                      ? "Enable all products"
                      : "Disable all products"}
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

const mapDispatchToProps: DispatchProps = {
  productStatus: ProductActions.updateAllProductsStatus,
};

export default connect<null, DispatchProps>(
  null,
  mapDispatchToProps
)(UpdateAllProductsStatusModal);
