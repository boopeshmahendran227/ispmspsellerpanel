import { GET_TEST_DRIVES_REQUEST } from "../constants/ActionTypes";

interface GetTestDrivesAction {
  type: typeof GET_TEST_DRIVES_REQUEST;
}

export type TestDriveActionType = GetTestDrivesAction;
