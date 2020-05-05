import { GET_TEST_DRIVES_REQUEST } from "../constants/ActionTypes";

interface GetTestDrivesAction {
  type: typeof GET_TEST_DRIVES_REQUEST;
}

export interface TestDriveInterface {
  customerId: string;
  images: string[];
  productId: number;
  productName: string;
  sellerId: string;
  skuId: string;
  requestedDate: string;
}

export type TestDriveActionType = GetTestDrivesAction;
