import Button from "./Button";
import { FieldArray, useFormikContext } from "formik";
import { FAQInterface } from "../types/product";
import CSSConstants from "../constants/CSSConstants";
import FieldTextArea from "./FieldTextArea";

const FAQInput = () => {
  const { values } = useFormikContext();

  const faqs: FAQInterface[] = values.faqs;

  const handleAdd = (arrayHelpers) => {
    arrayHelpers.push({
      question: "",
      answer: "",
    });
  };

  const handleDelete = (arrayHelpers, index: number) => {
    arrayHelpers.remove(index);
  };

  return (
    <FieldArray
      name="faqs"
      render={(arrayHelpers) => (
        <div className="container">
          <header>FAQs </header>
          <div className="inputContainer">
            <table>
              {faqs.length > 0 && (
                <thead>
                  <tr>
                    <th>S.no</th>
                    <th>Question</th>
                    <th>Answer</th>
                    <th></th>
                  </tr>
                </thead>
              )}
              <tbody>
                {faqs.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <FieldTextArea name={`faqs.${index}.question`} />
                    </td>
                    <td>
                      <FieldTextArea name={`faqs.${index}.answer`} />
                    </td>
                    <td>
                      <button onClick={() => handleDelete(arrayHelpers, index)}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="buttonContainer">
              <Button onClick={() => handleAdd(arrayHelpers)}>
                {faqs.length === 0 ? "Add FAQ" : "Add one more Q & A"}
              </Button>
            </div>
          </div>
          <style jsx>{`
            .container {
              margin: 3em 0;
              font-size: 1.1rem;
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
      )}
    />
  );
};

export default FAQInput;
