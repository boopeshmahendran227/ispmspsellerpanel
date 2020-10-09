import CSSConstants from "../../constants/CSSConstants";
import styled from "styled-components";
import { Box, Flex } from "@chakra-ui/core";

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 1.2em;
`;

const MetricCard = (props: MetricCardProps) => {
  const { icon } = props;

  return (
    <Box
      display="inline-block"
      bg={CSSConstants.foregroundColor}
      boxShadow="0 0 20px #00000014"
      w="100%"
      borderRadius="5%"
    >
      <Flex alignItems="center" h="100%" padding="1.2em">
        <Box mr="1.1em">{icon}</Box>
        <Box>
          <Box fontSize="1.7rem">{props.value}</Box>
          <Box
            textTransform="capitalize"
            fontSize="1.1rem"
            mt="0.2em"
            color={CSSConstants.secondaryTextColor}
          >
            {props.title}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default MetricCard;
