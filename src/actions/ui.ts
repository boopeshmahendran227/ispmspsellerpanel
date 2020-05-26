import {
  SHOW_SURE_MODAL,
  HIDE_SURE_MODAL,
  SHOW_LOADING_SCREEN,
  HIDE_LOADING_SCREEN,
  SHOW_REASON_MODAL,
  HIDE_REASON_MODAL,
  SHOW_UPDATE_QUOTE_MODAL,
  HIDE_UPDATE_QUOTE_MODAL,
  SURE_MODAL_SURE_CLICKED,
  SURE_MODAL_CANCEL_CLICKED,
  REASON_MODAL_SUBMIT_CLICKED,
  REASON_MODAL_CANCEL_CLICKED,
  SHOW_ATTRIBUTE_MODAL,
  HIDE_ATTRIBUTE_MODAL,
  SHOW_SKU_MODAL,
  HIDE_SKU_MODAL,
} from "../constants/ActionTypes";
import { UIActionType } from "../types/ui";

const showSureModal = (header: string, body: string): UIActionType => {
  return {
    type: SHOW_SURE_MODAL,
    header,
    body,
  };
};

const sureModalSureClicked = (): UIActionType => {
  return {
    type: SURE_MODAL_SURE_CLICKED,
  };
};

const sureModalCancelClicked = (): UIActionType => {
  return {
    type: SURE_MODAL_CANCEL_CLICKED,
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
  reasons: string[]
): UIActionType => {
  return {
    type: SHOW_REASON_MODAL,
    header,
    subHeader,
    reasons,
  };
};

const hideReasonModal = (): UIActionType => {
  return {
    type: HIDE_REASON_MODAL,
  };
};

const reasonModalSubmitClicked = (reason: string): UIActionType => {
  return {
    type: REASON_MODAL_SUBMIT_CLICKED,
    reason,
  };
};

const reasonModalCancelClicked = (): UIActionType => {
  return {
    type: REASON_MODAL_CANCEL_CLICKED,
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

const showAttributeModal = (): UIActionType => {
  return {
    type: SHOW_ATTRIBUTE_MODAL,
  };
};

const hideAttributeModal = (): UIActionType => {
  return {
    type: HIDE_ATTRIBUTE_MODAL,
  };
};

const showSkuModal = (): UIActionType => {
  return {
    type: SHOW_SKU_MODAL,
  };
};

const hideSkuModal = (): UIActionType => {
  return {
    type: HIDE_SKU_MODAL,
  };
};

export default {
  showSureModal,
  hideSureModal,
  sureModalSureClicked,
  sureModalCancelClicked,
  reasonModalSubmitClicked,
  reasonModalCancelClicked,
  showLoadingScreen,
  hideLoadingScreen,
  showReasonModal,
  hideReasonModal,
  showUpdateQuoteModal,
  hideUpdateQuoteModal,
  showAttributeModal,
  hideAttributeModal,
  showSkuModal,
  hideSkuModal,
};
