import { FAQInterface } from "../types/product";
import CSSConstants from "../constants/CSSConstants";

interface FAQProps {
  faqs: FAQInterface[];
}

const FAQ = (props: FAQProps) => {
  const { faqs } = props;

  if (faqs.length === 0) {
    return null;
  }

  return (
    <div className="container">
      <header>FAQs</header>
      <div>
        <table>
          <thead>
            <tr>
              <th>S.no</th>
              <th>Question</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.question}</td>
                <td>{item.answer}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
  );
};

export default FAQ;
