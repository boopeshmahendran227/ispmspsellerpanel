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
  const renderFaqBody = (index: number) => {
    return (
      <>
        <td>{index + 1}</td>
        <td>
          <FieldTextArea name={`faqs.${index}.question`} />
        </td>
        <td>
          <FieldTextArea name={`faqs.${index}.answer`} />
        </td>
        <style jsx>
          {`
            td {
              font-family: Lato;
            }
          `}
        </style>
      </>
    );
  };
  return (
    <FieldEditableArray
      title="FAQ"
      headers={["S.no", "Question", "Answer"]}
      name="faqs"
      handleAdd={addFaq}
      renderInputRow={renderFaqBody}
    />
  );
};

export default FAQInput;
