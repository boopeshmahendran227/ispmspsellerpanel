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
  Box,
} from "@chakra-ui/core";
import Button from "components/atoms/Button";

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
      size={["xs", "md"]}
      isCentered
    >
      <ModalOverlay />
      <ModalContent borderRadius={10} px={2}>
        <ModalHeader fontSize="lg" px={1}>
          {props.data.header}
        </ModalHeader>
        <ModalCloseButton
          _focus={{ boxShadow: "none" }}
          _hover={{
            color: "dangerColorVariant.500",
            transform: "rotate(90deg)",
          }}
          size="lg"
        />
        <ModalHeader fontSize="md" px={1}>
          {props.data.subHeader}
        </ModalHeader>
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
                  <Button type="submit">Submit</Button>
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
