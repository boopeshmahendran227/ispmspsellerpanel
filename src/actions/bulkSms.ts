import { SEND_BULKSMS } from "src/constants/ActionTypes";
import { BulkSmsRequestInterface, sendBulkSmsAction } from "types/bulkSms";

const sendBulkSms = (
  bulkSmsData: BulkSmsRequestInterface
): sendBulkSmsAction => {
  return {
    type: SEND_BULKSMS,
    bulkSmsData,
  };
};

export default {
  sendBulkSms,
};
