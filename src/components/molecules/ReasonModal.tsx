import { connect } from "react-redux";
import { RootState } from "../../reducers";
import { getReasonModalData } from "../../selectors/ui";
import UIActions from "../../actions/ui";
import { ReasonModalData } from "../../types/ui";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import RadioButton from "../atoms/RadioButton";
import { splitCamelCase } from "utils/misc";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
} from "@chakra-ui/core";

interface StateProps {
  data: ReasonModalData;
}

interface DispatchProps {
  onSubmit: (reason: string) => void;
  onCancel: () => void;
}

type ReasonModalProps = StateProps & DispatchProps;

const ReasonModal = (props: ReasonModalProps) => {
  const handleSubmit = (values) => {
    props.onSubmit(values.reason);
  };

  return (
    <Modal
      isOpen={props.data.open}
      onClose={props.onCancel}
      size="md"
      isCentered
    >
      <ModalOverlay />
      <ModalContent borderRadius={10}>
        <ModalHeader>{props.data.header}</ModalHeader>
        <ModalCloseButton />
        <ModalHeader fontSize="md">{props.data.subHeader}</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              reason: props.data.reasons[0],
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              reason: Yup.string().required("Reason is requied"),
            })}
            enableReinitialize={true}
          >
            {() => (
              <Form>
                <Field name="reason">
                  {({ field }) => (
                    <Box>
                      {props.data.reasons.map((reason) => (
                        <Box>
                          <RadioButton
                            label={splitCamelCase(reason)}
                            value={reason}
                            checked={field.value === reason}
                            onChange={(value) => {
                              field.onChange({
                                target: {
                                  name: "reason",
                                  value: reason,
                                },
                              });
                            }}
                          />
                        </Box>
                      ))}
                    </Box>
                  )}
                </Field>
                <Box my={3}>
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
  data: getReasonModalData(state),
});

const mapDispatchToProps: DispatchProps = {
  onSubmit: UIActions.reasonModalSubmitClicked,
  onCancel: UIActions.reasonModalCancelClicked,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(ReasonModal);
