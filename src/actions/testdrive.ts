import { GET_TEST_DRIVES_REQUEST } from "../constants/ActionTypes";
import { TestDriveActionType } from "../types/testdrive";

const getTestDrives = (): TestDriveActionType => {
  return {
    type: GET_TEST_DRIVES_REQUEST,
  };
};

export default {
  getTestDrives,
};
