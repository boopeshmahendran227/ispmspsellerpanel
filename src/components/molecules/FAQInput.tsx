import FieldTextArea from "../atoms/FieldTextArea";
import FieldEditableArray from "./FieldEditableArray";
import { ArrayHelpers } from "formik";
import CSSConstants from "../../constants/CSSConstants";

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
    <>
      <header>FAQ</header>
      <FieldEditableArray
        headers={["S.no", "Question", "Answer"]}
        name="faqs"
        onAdd={addFaq}
        renderInputRow={renderFaqRow}
        label="FAQ"
      />
      <style jsx>{`
        header {
          font-weight: bold;
          font-size: 1.3rem;
          border-bottom: 1px solid ${CSSConstants.borderColor};
          padding: 0.3em;
          margin-bottom: 1em;
        }
      `}</style>
    </>
  );
};

export default FAQInput;
