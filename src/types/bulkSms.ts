import { SEND_BULKSMS_REQUEST } from "src/constants/ActionTypes";

export enum RecipientType {
  ExistingUser,
  Group,
  NonExistingUser,
}

export interface SuggestedUserInterface {
  name: string;
  id: string;
  phoneNumber: string;
}

export interface BulkSmsGroup {
  groupId: string;
  groupName: string;
  noOfRecipients: number;
}

export interface BulkSmsRequestInterface {
  messageToSend: string;
  customerIds: string[];
  mobileNos: string[];
  scheduledDate: string;
  groupIds: string[];
}

export interface RecipientInterface {
  name: string;
  phoneNumber: string;
  id: string;
  recipientType: RecipientType;
}

export interface sendBulkSmsAction {
  type: typeof SEND_BULKSMS_REQUEST;
  bulkSmsData: BulkSmsRequestInterface;
}
