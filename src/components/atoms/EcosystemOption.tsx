import { EcosystemDataInterface } from "../../types/business";
import CSSConstants from "../../constants/CSSConstants";
import { Box, Flex, Stack, Text } from "@chakra-ui/core";

interface EcosystemOptionProps {
  ecosystem: EcosystemDataInterface;
}

const EcosystemOption = (props: EcosystemOptionProps) => {
  const { ecosystem } = props;
  return (
    <Box>
      <Stack w="100%" justify="space-between" spacing={3} isInline>
        <Box fontSize="md">{ecosystem.ecosystem_name}</Box>
        <Box fontSize="sm">
          {ecosystem.mode === "PRIVATE" ? (
            <i className="privateIcon fa fa-lock" aria-hidden="true"></i>
          ) : (
            <i className="publicIcon fas fa-users"></i>
          )}
        </Box>
      </Stack>
      <Text fontSize="xs" color="secondaryTextColor">
        {ecosystem.ecosystem_url[0]}
      </Text>
      <style jsx>{`
        .publicIcon {
          color: ${CSSConstants.successColor};
        }
        .privateIcon {
          color: ${CSSConstants.dangerColor};
        }
      `}</style>
    </Box>
  );
};

export default EcosystemOption;
