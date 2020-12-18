import { FAQInterface } from "../../types/product";
import SectionCard from "../atoms/SectionCard";
import SectionHeader from "components/atoms/SectionHeader";
import SectionHeaderContainer from "components/atoms/SectionHeaderContainer";
import { Box } from "@chakra-ui/core";

const Question = (props) => (
  <Box my={2} fontWeight="bold" fontSize={["sm", "md"]}>
    {props.children}
  </Box>
);

const Answer = (props) => <Box fontSize={["sm", "md"]}>{props.children}</Box>;

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
        {faqs.map((item, index) => (
          <Box my={2} key={index}>
            <Question>Q: {item.question}</Question>
            <Answer>A: {item.question}</Answer>
          </Box>
        ))}
      </Box>
    </SectionCard>
  );
};

export default FAQ;
