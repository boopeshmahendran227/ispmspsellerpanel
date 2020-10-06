import FieldTextArea from "./FieldTextArea";
import FieldEditableArray from "./FieldEditableArray";
import { ArrayHelpers } from "formik";
import CSSConstants from "../constants/CSSConstants";
import SectionHeaderContainer from "./atoms/SectionHeaderContainer";
import SectionHeader from "./atoms/SectionHeader";

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
    <div className="container">
      <SectionHeaderContainer>
        <SectionHeader>FAQ</SectionHeader>
      </SectionHeaderContainer>
      <FieldEditableArray
        headers={["S.no", "Question", "Answer"]}
        name="faqs"
        onAdd={addFaq}
        renderInputRow={renderFaqRow}
        label="FAQ"
      />
      <style jsx>{`
        .container {
          margin-top: 3em;
        }
        header {
          font-weight: bold;
          font-size: 1.3rem;
          border-bottom: 1px solid ${CSSConstants.borderColor};
          padding: 0.3em;
          margin-bottom: 1em;
        }
      `}</style>
    </div>
  );
};

export default FAQInput;
