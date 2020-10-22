import { Box, Flex } from "@chakra-ui/core";

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

const MetricCard = (props: MetricCardProps) => {
  const { icon } = props;

  return (
    <Box
      display="inline-block"
      bg="foregroundColor"
      boxShadow="md"
      w="100%"
      borderRadius={8}
    >
      <Flex alignItems="center" h="100%" padding={[3, 4, 3, null, 5]}>
        <Box mr={3}>{icon}</Box>
        <Box>
          <Box fontSize={["sm", null, null, "xs", "md"]} fontWeight="bold">
            {props.value}
          </Box>
          <Box
            textTransform="capitalize"
            fontSize={["sm", "md"]}
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
