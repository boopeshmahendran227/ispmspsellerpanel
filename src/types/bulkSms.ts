import { SEND_BULKSMS } from "src/constants/ActionTypes";

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
  totalNumberOfRecipients: number;
}

export interface User {
  name: string;
  phoneNumber: string;
  id: string;
  recipientType: RecipientType.ExistingUser | RecipientType.NonExistingUser;
}

export interface UserGroup {
  name: string;
  id: string;
  recipientType: RecipientType.Group;
  numberOfRecipients: number;
}

export interface sendBulkSmsAction {
  type: typeof SEND_BULKSMS;
  bulkSmsData: BulkSmsRequestInterface;
}
