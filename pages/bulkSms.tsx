import { SimpleGrid, Box, Heading, Stack, FormLabel } from "@chakra-ui/core";
import WithAuth from "components/atoms/WithAuth";
import { connect } from "react-redux";
import Button from "components/atoms/Button";
import FieldTextArea from "components/atoms/FieldTextArea";
import ValidationErrorMsg from "components/atoms/ValidationErrorMsg";
import FieldDatePicker from "components/molecules/FieldDatePicker";
import { Formik, Form, ErrorMessage } from "formik";
import moment from "moment";
import { BulkSmsRequestInterface, RecipientType } from "types/bulkSms";
import * as Yup from "yup";
import BulkSmsAction from "actions/bulkSms";
import RecipientInputBox from "components/atoms/RecipientInputBox";

interface DispatchProps {
  sendBulkSms: (bulkSmsData: BulkSmsRequestInterface) => void;
}

const validationSchema = Yup.object().shape({
  recipients: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required(),

        id: Yup.string().required(),
        recipientType: Yup.mixed()
          .oneOf([
            RecipientType.ExistingUser,
            RecipientType.Group,
            RecipientType.NonExistingUser,
          ])
          .required(),
        phoneNumber: Yup.string().when("recipientType", {
          is: RecipientType.ExistingUser | RecipientType.NonExistingUser,
          then: Yup.string().required(),
        }),
        numberOfRecipients: Yup.number().when("recipientType", {
          is: RecipientType.Group,
          then: Yup.number().required(),
        }),
      })
    )
    .required(),
  message: Yup.string().required(),
  scheduledDate: Yup.date().required(),
});

type InputInterface = Yup.InferType<typeof validationSchema>;

const BulkSms = (props: DispatchProps) => {
  const onSubmit = (values) => {
    props.sendBulkSms({
      totalNumberOfRecipients:
        values.recipients
          .filter(
            (recipients) => recipients.recipientType === RecipientType.Group
          )
          .reduce(
            (total, currentNumber) => total + currentNumber.numberOfRecipients,
            0
          ) +
        values.recipients.filter(
          (recipient) => recipient.recipientType !== RecipientType.Group
        ).length,
      messageToSend: values.message,
      scheduledDate: values.scheduledDate.format(),
      groupIds: values.recipients
        .filter((recipient) => recipient.recipientType === RecipientType.Group)
        .map((group) => group.id),
      mobileNos: values.recipients
        .filter(
          (recipient) =>
            recipient.recipientType === RecipientType.NonExistingUser
        )
        .map((nonExistingUser) => nonExistingUser.phoneNumber),
      customerIds: values.recipients
        .filter(
          (recipient) => recipient.recipientType === RecipientType.ExistingUser
        )
        .map((existingUser) => existingUser.id),
    });
  };

  return (
    <Box
      maxW="700px"
      mx={[2, "auto"]}
      my={[1, 8]}
      p={5}
      pb={4}
      boxShadow="md"
      bg="foregroundColor"
    >
      <Heading
        size="xl"
        mt={3}
        mb={10}
        fontWeight="bold"
        fontSize="xl"
        textTransform="uppercase"
      >
        Bulk SMS
      </Heading>
      <Formik
        initialValues={{
          recipients: [],
          scheduledDate: moment(),
          message: "",
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue, resetForm }) => (
          <Form>
            <SimpleGrid columns={1} spacing={3}>
              <Box>
                <FormLabel fontWeight="bold">To:</FormLabel>
                <RecipientInputBox
                  recipients={values.recipients}
                  onChange={(values) => setFieldValue("recipients", values)}
                />
                <ErrorMessage
                  component={ValidationErrorMsg}
                  name={"recipients"}
                />
              </Box>
              <Box>
                <FormLabel fontWeight="bold">Message:</FormLabel>
                <FieldTextArea
                  name="message"
                  placeholder="Enter your Message..."
                />
                <Box
                  textAlign="right"
                  fontSize={12}
                  color={"secondaryTextColor"}
                  my={1}
                  mr={1}
                >
                  Characters: {values.message.length}
                </Box>
              </Box>
              <Box>
                <FormLabel fontWeight="bold">Deliver By:</FormLabel>
                <FieldDatePicker name="scheduledDate" />
              </Box>
            </SimpleGrid>
            <Stack isInline spacing={4} justify={["center", "flex-end"]} mt={5}>
              <Box>
                <Button type="submit" variantColor="successColorVariant">
                  Submit
                </Button>
              </Box>
              <Box>
                <Button
                  variant="outline"
                  onClick={resetForm}
                  type="reset"
                  variantColor="dangerColorVariant"
                >
                  Clear
                </Button>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const mapDispatchToProps: DispatchProps = {
  sendBulkSms: BulkSmsAction.sendBulkSms,
};

export default WithAuth(
  connect<null, DispatchProps>(null, mapDispatchToProps)(BulkSms)
);
