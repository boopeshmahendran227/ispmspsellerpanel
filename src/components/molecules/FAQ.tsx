import { FAQInterface } from "../../types/product";
import SectionCard from "../atoms/SectionCard";
import SectionHeader from "components/atoms/SectionHeader";
import SectionHeaderContainer from "components/atoms/SectionHeaderContainer";
import { Box, PseudoBox } from "@chakra-ui/core";


const Question = (props) => (
  <PseudoBox my={2} fontWeight="bold" _before={{ content: "Q: " }}>
    {props.children}
  </PseudoBox>
);

const Answer = (props) => (
  <PseudoBox _before={{ content: "A: " }}>{props.children}</PseudoBox>
);

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
      <Box>
        {faqs.map((item) => (
          <Box my={2}>
            <Question>{item.question}</Question>
            <Answer>{item.question}</Answer>
          </Box>
        ))}
      </Box>
    </SectionCard>
  );
};

export default FAQ;
