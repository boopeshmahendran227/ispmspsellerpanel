export interface NotificationItemInterface {
  id: number;
  subject: string;
  message: string;
  type: string;
  metadata: string;
  isRead: boolean;
  createdDateTime: string;
}
