import { FAQInterface } from "../../types/product";
import SectionCard from "../atoms/SectionCard";
import SectionHeader from "components/atoms/SectionHeader";
import styled from "styled-components";
import SectionHeaderContainer from "components/atoms/SectionHeaderContainer";

const QAContainer = styled.div`
  margin: 0.6em 0;
`;

const Question = styled.div`
  margin: 0.4em 0;
  font-weight: bold;
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
      <SectionHeaderContainer>
        <SectionHeader>FAQs</SectionHeader>
      </SectionHeaderContainer>
      <div>
        {faqs.map((item) => (
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
