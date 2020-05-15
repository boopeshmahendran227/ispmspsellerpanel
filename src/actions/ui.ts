import {
  SHOW_SURE_MODAL,
  HIDE_SURE_MODAL,
  SHOW_LOADING_SCREEN,
  HIDE_LOADING_SCREEN,
  SHOW_REASON_MODAL,
  HIDE_REASON_MODAL,
  SHOW_UPDATE_QUOTE_MODAL,
  HIDE_UPDATE_QUOTE_MODAL,
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

const showReasonModal = (
  header: string,
  subHeader: string,
  reasons: string[],
  onSubmit: (reason: string) => void
): UIActionType => {
  return {
    type: SHOW_REASON_MODAL,
    header,
    subHeader,
    reasons,
    onSubmit,
  };
};

const hideReasonModal = (): UIActionType => {
  return {
    type: HIDE_REASON_MODAL,
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

const showUpdateQuoteModal = (): UIActionType => {
  return {
    type: SHOW_UPDATE_QUOTE_MODAL,
  };
};

const hideUpdateQuoteModal = (): UIActionType => {
  return {
    type: HIDE_UPDATE_QUOTE_MODAL,
  };
};

export default {
  showSureModal,
  hideSureModal,
  showLoadingScreen,
  hideLoadingScreen,
  showReasonModal,
  hideReasonModal,
  showUpdateQuoteModal,
  hideUpdateQuoteModal,
};
