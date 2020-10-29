import {
  SimpleGrid,
  Box,
  Heading,
  Stack,
  Tag,
  TagLabel,
  FormLabel,
  Flex,
  TagIcon,
} from "@chakra-ui/core";
import WithAuth from "components/atoms/WithAuth";
import { connect } from "react-redux";
import Button from "components/atoms/Button";
import FieldTextArea from "components/atoms/FieldTextArea";
import Loader from "components/atoms/Loader";
import PageError from "components/atoms/PageError";
import RecipientInputBox from "components/atoms/RecipientInputBox";
import ValidationErrorMsg from "components/atoms/ValidationErrorMsg";
import FieldDatePicker from "components/molecules/FieldDatePicker";
import { Formik, Form, ErrorMessage } from "formik";
import moment from "moment";
import useSWR from "swr";
import {
  BulkSmsGroup,
  BulkSmsRequestInterface,
  RecipientType,
} from "types/bulkSms";
import * as Yup from "yup";
import BulkSmsAction from "actions/bulkSms";

interface DispatchProps {
  sendBulkSms: (bulkSmsData: BulkSmsRequestInterface) => void;
}

const validationSchema = Yup.object().shape({
  recipients: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required(),
        phoneNumber: Yup.string().required(),
        id: Yup.string().required(),
        recipientType: Yup.mixed()
          .oneOf([
            RecipientType.ExistingUser,
            RecipientType.Group,
            RecipientType.NonExistingUser,
          ])
          .required(),
      })
    )
    .required()
    .nullable(),
  message: Yup.string().required().nullable(),
  scheduledDate: Yup.date().required().nullable(),
});

type InputInterface = Yup.InferType<typeof validationSchema>;

const BulkSms = (props: DispatchProps) => {
  const groupsSwr = useSWR("/bulksms/groups");
  const error = groupsSwr.error;
  const groups: BulkSmsGroup[] = groupsSwr.data;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!groups) {
    return <Loader />;
  }

  const onSubmit = (values) => {
    props.sendBulkSms({
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
        .map((existingUser) => existingUser.phoneNumber),
    });
  };

  return (
    <Box
      maxW="700px"
      mx={[2, "auto"]}
      my={[1, 8]}
      p={6}
      boxShadow="md"
      bg="foregroundColor"
    >
      <Heading
        size="xl"
        mt={3}
        mb={4}
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
        {({ values, setFieldValue, resetForm, errors }) => (
          <Form>
            <SimpleGrid columns={1}>
              <Flex wrap="wrap">
                {groups.map((group) => (
                  <Tag
                    m={1}
                    size={"sm"}
                    cursor="pointer"
                    variantColor="blue"
                    onClick={() => {
                      if (
                        values.recipients.some(
                          (recipient) => recipient.id === group.groupId
                        )
                      ) {
                        return;
                      }
                      setFieldValue("recipients", [
                        ...values.recipients,
                        {
                          name: group.groupName,
                          phoneNumber: group.noOfRecipients,
                          id: group.groupId,
                          recipientType: RecipientType.Group,
                        },
                      ]);
                    }}
                  >
                    <TagIcon icon="add" size="12px" />
                    <TagLabel>
                      {group.groupName} ({group.noOfRecipients})
                    </TagLabel>
                  </Tag>
                ))}
              </Flex>
              <FormLabel>To</FormLabel>
              <Box>
                <RecipientInputBox
                  recipients={values.recipients}
                  onChange={(values) => setFieldValue("recipients", values)}
                />
                <ErrorMessage
                  component={ValidationErrorMsg}
                  name={"recipients"}
                />
              </Box>
              <FormLabel>Message</FormLabel>
              <FieldTextArea name="message" />
              <FormLabel>Deliver By</FormLabel>
              <FieldDatePicker name="scheduledDate" />
            </SimpleGrid>
            <Stack isInline spacing={4} justify={["center", "flex-end"]} mt={2}>
              <Box>
                <Button type="submit" variantColor="successColorVariant">
                  Submit
                </Button>
              </Box>
              <Box>
                <Button
                  variant="outline"
                  onClick={() => resetForm}
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
