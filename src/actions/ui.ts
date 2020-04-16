import {
  SHOW_SURE_MODAL,
  HIDE_SURE_MODAL,
  SHOW_LOADING_SCREEN,
  HIDE_LOADING_SCREEN,
} from "../constants/ActionTypes";
import { UIActionType } from "../types/ui";

const showSureModal = (
  header: string,
  body: string,
  onSure: () => void
): UIActionType => {
  return {
    type: SHOW_SURE_MODAL,
    header,
    body,
    onSure,
  };
};

const hideSureModal = (): UIActionType => {
  return {
    type: HIDE_SURE_MODAL,
  };
};

const showLoadingScreen = (): UIActionType => {
  return {
    type: SHOW_LOADING_SCREEN,
  };
};

const hideLoadingScreen = (): UIActionType => {
  return {
    type: HIDE_LOADING_SCREEN,
  };
};

export default {
  showSureModal,
  hideSureModal,
  showLoadingScreen,
  hideLoadingScreen,
};
