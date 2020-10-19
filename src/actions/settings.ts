import { SettingsInterface, SettingsActionType } from "types/settings";
import { UPDATE_SETTINGS_REQUEST } from "src/constants/ActionTypes";

const updateSettings = (settings: SettingsInterface): SettingsActionType => {
  return {
    type: UPDATE_SETTINGS_REQUEST,
    settings,
  };
};

export default {
  updateSettings,
};
