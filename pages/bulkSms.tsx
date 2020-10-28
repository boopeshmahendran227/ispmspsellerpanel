import {
  Grid,
  Box,
  Heading,
  Stack,
  IconButton,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
  Divider,
} from "@chakra-ui/core";
import Button from "components/atoms/Button";
import FieldTextArea from "components/atoms/FieldTextArea";
import InputLabel from "components/atoms/InputLabel";
import AddCustomerModal from "components/molecules/AddCustomerModal";
import FieldDatePicker from "components/molecules/FieldDatePicker";
import { Formik, Form } from "formik";
import moment from "moment";
import React, { useState } from "react";

enum RecipientType {
  ExistingUser,
  Group,
  NonExistingUser,
}

const BulkSms = () => {
  const [addCustomerModal, setAddCustomerModal] = useState(false);

  const [searchText, setSearchText] = useState("");
  const onSubmit = () => {};
  const sug = [
    {
      name: "name",
      number: "984888888",
      recipientType: RecipientType.ExistingUser,
    },
    {
      name: "data",
      number: "7894545445",
      recipientType: RecipientType.ExistingUser,
    },
  ];

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
          to: [
            {
              name: "All",
              number: "10",
              recipientType: RecipientType.Group,
            },
          ],
          scheduleDate: moment(),
          message: "",
        }}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, resetForm }) => (
          <Form>
            <AddCustomerModal
              open={addCustomerModal}
              onClose={() => setAddCustomerModal(false)}
            />
            <Grid templateColumns={["1fr", "300px 1fr"]}>
              <InputLabel label="To" />
              <Box
                border="1px"
                borderColor="#ccc"
                minH="20vh"
                w="100%"
                p={2}
                borderRadius={5}
              >
                {values.to.map((tag, index) => (
                  <Tag
                    size={"sm"}
                    m={1}
                    key={index}
                    rounded="full"
                    variant="solid"
                    fontSize={["xs", "sm"]}
                    variantColor={
                      tag.recipientType === RecipientType.NonExistingUser
                        ? "red"
                        : "blue"
                    }
                  >
                    <TagLabel>{`${tag.name}(${tag.number})`}</TagLabel>
                    <TagCloseButton
                      onClick={() => {
                        setFieldValue(
                          "to",
                          values.to.filter((val) => val.number !== tag.number)
                        );
                      }}
                    />
                  </Tag>
                ))}

                <Input
                  variant="unstyled"
                  name="search"
                  placeholder="Add Recipients"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />

                <Box
                  boxShadow={searchText === "" ? "none" : "md"}
                  mx={2}
                  fontSize="md"
                  px={1}
                >
                  {sug.length > 0 &&
                  sug.some((sug) => sug.name === searchText) ? (
                    sug.map((su) => (
                      <Box
                        onClick={() => {
                          if (values.to.some((t) => t.name === su.name)) {
                            return;
                          }
                          setFieldValue("to", [...values.to, su]);
                          setSearchText("");
                        }}
                      >
                        <Box as="span">{su.name}</Box>
                        <Box as="span">{su.number}</Box>
                        <Divider />
                      </Box>
                    ))
                  ) : (
                    <Box
                      onClick={() => {
                        if (searchText.length === 10) {
                          setFieldValue("to", [
                            ...values.to,
                            {
                              name: "unknown",
                              number: searchText,
                              recipientType: RecipientType.NonExistingUser,
                            },
                          ]);
                          setSearchText("");
                        }
                      }}
                    >
                      {searchText}
                    </Box>
                  )}
                </Box>
              </Box>
              {console.log(values.to)}
              {/* <Stack isInline alignItems="center" spacing={3}>
                <Box>
                  <FieldTextArea name="to" />
                </Box>
                <Box cursor="pointer">
                  <Users onClick={() => setAddCustomerModal(true)} />
                </Box>
              </Stack> */}
              <InputLabel label="Message" />
              <FieldTextArea name="message" />
              <InputLabel label="Schedule Delivery Date" />
              <FieldDatePicker name="scheduleDate" />
            </Grid>
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

export default BulkSms;
