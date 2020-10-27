import Button from "../atoms/Button";
import { connect } from "react-redux";
import { RootState } from "../../reducers";
import { Formik, Form } from "formik";
import UIActions from "../../actions/ui";
import CreditActions from "../../actions/credit";
import InputLabel from "../atoms/InputLabel";
import FieldPriceInput from "../atoms/FieldPriceInput";
import { InvoiceInterface, PaymentMode } from "../../types/invoice";
import { getCurrentInvoice } from "../../selectors/invoice";
import { getUpdateCreditsModalOpen } from "../../selectors/ui";
import FieldSelect from "./FieldSelect";
import FieldInput from "../atoms/FieldInput";
import {
  Box,
  Stack,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/core";

interface StateProps {
  open: boolean;
  currentInvoice: InvoiceInterface | null;
}

interface DispatchProps {
  updateCreditsRequest: (
    invoiceId: number,
    creditsPaid: number,
    paymentMode: PaymentMode,
    paymentReferenceId: string
  ) => void;
  onClose: () => void;
}

const paymentOptions = [
  {
    value: PaymentMode.Cash,
    label: "Cash",
  },
  {
    value: PaymentMode.Online,
    label: "Online",
  },
  {
    value: PaymentMode.PazaWallet,
    label: "Paza Wallet",
  },
];

type UpdateCreditsModalProps = StateProps & DispatchProps;

const UpdateCreditsModal = (props: UpdateCreditsModalProps) => {
  const { currentInvoice } = props;

  if (!currentInvoice) {
    // Return empty modal
    return (
      <Modal isOpen={props.open} onClose={props.onClose}>
        <Box></Box>
      </Modal>
    );
  }

  const onSubmit = (values, { resetForm }) => {
    props.updateCreditsRequest(
      currentInvoice.invoiceId,
      values.creditsPaid,
      values.paymentMode.value,
      values.paymentReferenceId
    );
    props.onClose();
    resetForm();
  };

  const handleCancelClicked = () => {
    props.onClose();
  };

  return (
    <Modal isOpen={props.open} onClose={props.onClose} size={["xs", "md"]}>
      <ModalOverlay />
      <ModalContent borderRadius={10} p={3}>
        <ModalHeader fontSize={["md", "lg"]}>
          Record Credit Payment For Invoice #{currentInvoice.invoiceId}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              creditsPaid: 0,
              paymentMode: paymentOptions[0],
              paymentReferenceId: "",
            }}
            onSubmit={onSubmit}
            validate={(values) => {
              const errors: any = {};
              const { creditsPaid } = values;

              if (creditsPaid > currentInvoice.creditAmountPending) {
                errors.creditsPaid =
                  "Paid Credits should be less than or equal to pending amount";
              }
              return errors;
            }}
          >
            {() => (
              <Form>
                <SimpleGrid columns={[1, 2]} alignItems="center">
                  <InputLabel label="Paid Credits" />
                  <FieldPriceInput name="creditsPaid" />
                  <InputLabel label="Payment Mode" />
                  <FieldSelect name="paymentMode" options={paymentOptions} />
                  <InputLabel label="Payment Reference Id" />
                  <FieldInput name="paymentReferenceId" />
                </SimpleGrid>
                <Stack spacing={3} isInline mt={3}>
                  <Box>
                    <Button type="submit">Update Pending Credits</Button>
                  </Box>
                  <Box>
                    <Button
                      variant="outline"
                      variantColor="dangerColorVariant"
                      onClick={handleCancelClicked}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Stack>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  open: getUpdateCreditsModalOpen(state),
  currentInvoice: getCurrentInvoice(state),
});

const mapDispatchToProps: DispatchProps = {
  updateCreditsRequest: CreditActions.updateCreditsRequest,
  onClose: UIActions.hideUpdateCreditsModal,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(UpdateCreditsModal);
