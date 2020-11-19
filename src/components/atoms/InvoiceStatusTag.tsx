import CSSConstants from "../../constants/CSSConstants";
import Chroma from "chroma-js";
import { InvoiceStatus } from "../../types/invoice";
import { Tag, TagLabel, Box, Text } from "@chakra-ui/core";

const getCurrentColor = (status: InvoiceStatus) => {
  switch (status) {
    case InvoiceStatus.Draft:
      return "disabledColorVariant";
    case InvoiceStatus.Issued:
      return "lightPrimaryColorVariant";
    case InvoiceStatus.Pending:
    case InvoiceStatus.Partial:
    case InvoiceStatus.Overdue:
      return "warningColorVariant";
    case InvoiceStatus.Paid:
      return "successColorVariant";
    case InvoiceStatus.Cancelled:
      return "dangerColorVariant";
  }
};

interface InvoiceStatusTagProps {
  status: InvoiceStatus;
}

const InvoiceStatusTag = (props: InvoiceStatusTagProps) => {
  const { status } = props;
  const currentColor = getCurrentColor(status);

  return (
    <Box minW="100px">
      <Tag
        variant="subtle"
        rounded="full"
        size={"sm"}
        variantColor={currentColor}
        fontWeight="bold"
        px={4}
        py={1}
        m={[1, 2]}
        color={`${currentColor}.500`}
      >
        <Text fontSize={["xs", null, null, null, "sm"]}>
          {status === InvoiceStatus.Paid ? "Paid / COD" : status}
        </Text>
      </Tag>
    </Box>
  );
};

export default InvoiceStatusTag;
