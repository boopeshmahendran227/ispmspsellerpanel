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
      bg="foregroundColor"
      boxShadow="md"
      w="100%"
      borderRadius="5%"
    >
      <Flex alignItems="center" h="100%" padding="1.2em">
        <Box mr={3}>{icon}</Box>
        <Box>
          <Box fontSize="lg">{props.value}</Box>
          <Box
            textTransform="capitalize"
            fontSize="md"
            mt={1}
            color="secondaryTextColor"
          >
            {props.title}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default MetricCard;
