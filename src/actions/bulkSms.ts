import { SEND_BULKSMS_REQUEST } from "src/constants/ActionTypes";
import { BulkSmsRequestInterface, sendBulkSmsAction } from "types/bulkSms";

const sendBulkSms = (
  bulkSmsData: BulkSmsRequestInterface
): sendBulkSmsAction => {
  return {
    type: SEND_BULKSMS_REQUEST,
    bulkSmsData,
  };
};

export default {
  sendBulkSms,
};
