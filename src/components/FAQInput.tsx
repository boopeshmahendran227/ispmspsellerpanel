import Button from "./Button";
import { FieldArray, useFormikContext, Field } from "formik";
import { FAQInterface } from "../types/product";

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
          <div className="label">FAQs: </div>
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
                      <Field name={`faqs.${index}.question`} />
                    </td>
                    <td>
                      <Field name={`faqs.${index}.answer`} />
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
              margin: 1em 0;
              width: 100%;
              font-size: 1.1rem;
              display: flex;
              align-items: center;
            }
            .label {
              display: inline-block;
              font-weight: 500;
              min-width: 200px;
              text-align: right;
            }
            .inputContainer {
              margin: 0 1em;
            }
          `}</style>
        </div>
      )}
    />
  );
};

export default FAQInput;
