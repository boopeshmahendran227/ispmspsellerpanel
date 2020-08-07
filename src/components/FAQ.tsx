import { FAQInterface } from "../types/product";
import SectionCard from "./SectionCard";
import SectionHeader from "./SectionHeader";
import styled from "styled-components";

const QAContainer = styled.div`
  margin: 0.4em 0;
`;

const Question = styled.div`
  &::before {
    content: "Q: ";
  }
`;

const Answer = styled.div`
  &::before {
    content: "A: ";
  }
`;

interface FAQProps {
  faqs: FAQInterface[];
}

const FAQ = (props: FAQProps) => {
  const { faqs } = props;

  if (faqs.length === 0) {
    return null;
  }

  return (
    <SectionCard>
      <SectionHeader>FAQs</SectionHeader>
      <div>
        {faqs.map((item, index) => (
          <QAContainer>
            <Question>{item.question}</Question>
            <Answer>{item.question}</Answer>
          </QAContainer>
        ))}
      </div>
    </SectionCard>
  );
};

export default FAQ;
