import CSSConstants from "../../constants/CSSConstants";
import Chroma from "chroma-js";
import { InvoiceStatus } from "../../types/invoice";
import { Tag, TagLabel, Box } from "@chakra-ui/core";

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
    <Tag
      variant="subtle"
      rounded="full"
      size="lg"
      variantColor={currentColor}
      fontWeight="bold"
      p="0.5rem 1rem"
      m="1rem 0"
    >
      {status === InvoiceStatus.Paid ? "Paid / COD" : status}
    </Tag>
  );
};

export default InvoiceStatusTag;
