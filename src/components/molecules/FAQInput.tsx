import FieldTextArea from "../atoms/FieldTextArea";
import FieldEditableArray from "./FieldEditableArray";
import { ArrayHelpers } from "formik";
import SectionHeaderContainer from "../atoms/SectionHeaderContainer";
import SectionHeader from "../atoms/SectionHeader";
import { Box, Divider } from "@chakra-ui/core";

const FAQInput = () => {
  const addFaq = (arrayHelpers: ArrayHelpers) => {
    arrayHelpers.push({
      question: "",
      answer: "",
    });
  };

  const renderFaqRow = (index: number) => {
    return (
      <>
        <td>{index + 1}</td>
        <td>
          <FieldTextArea name={`faqs.${index}.question`} />
        </td>
        <td>
          <FieldTextArea name={`faqs.${index}.answer`} />
        </td>
      </>
    );
  };
  return (
    <Box mt={3} fontSize="md">
      <SectionHeaderContainer>
        <SectionHeader>FAQ</SectionHeader>
        <Divider borderColor="borderColor.500" />
      </SectionHeaderContainer>
      <FieldEditableArray
        headers={["S.no", "Question", "Answer"]}
        name="faqs"
        onAdd={addFaq}
        renderInputRow={renderFaqRow}
        label="FAQ"
      />
    </Box>
  );
};

export default FAQInput;
