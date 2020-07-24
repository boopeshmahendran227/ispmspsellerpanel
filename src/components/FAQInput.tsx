import FieldTextArea from "./FieldTextArea";
import FieldEditableArray from "./FieldEditableArray";
import { ArrayHelpers } from "formik";

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
    <FieldEditableArray
      title="FAQ"
      headers={["S.no", "Question", "Answer"]}
      name="faqs"
      handleAdd={addFaq}
      renderInputRow={renderFaqRow}
    />
  );
};

export default FAQInput;
