import { combineReducers } from "redux";
import {
  SHOW_SURE_MODAL,
  HIDE_SURE_MODAL,
  SHOW_LOADING_SCREEN,
  HIDE_LOADING_SCREEN,
  SHOW_REASON_MODAL,
  HIDE_REASON_MODAL,
  SHOW_UPDATE_QUOTE_MODAL,
  HIDE_UPDATE_QUOTE_MODAL,
  SHOW_ATTRIBUTE_MODAL,
  HIDE_ATTRIBUTE_MODAL,
  SHOW_SKU_MODAL,
  HIDE_SKU_MODAL,
  SHOW_UPDATE_CREDITS_MODAL,
  HIDE_UPDATE_CREDITS_MODAL,
} from "../constants/ActionTypes";
import { SureModalData, UIActionType, ReasonModalData } from "../types/ui";

const getSureModalData = (
  state: SureModalData = {
    header: "Confirm",
    body: "Are you sure you want to continue?",
    open: false,
  },
  action: UIActionType
) => {
  switch (action.type) {
    case SHOW_SURE_MODAL:
      return {
        open: true,
        header: action.header,
        body: action.body,
      };
    case HIDE_SURE_MODAL:
      return {
        open: false,
        header: "Confirm",
        body: "Are you sure you want to continue?",
      };
  }
  return state;
};

const getLoadingScreenOpen = (state: boolean = false, action) => {
  switch (action.type) {
    case SHOW_LOADING_SCREEN:
      return true;
    case HIDE_LOADING_SCREEN:
      return false;
  }
  return state;
};

const getReasonModalData = (
  state: ReasonModalData = {
    header: "Confirm",
    subHeader: "Please provide a reason",
    open: false,
    reasons: [],
  },
  action: UIActionType
) => {
  switch (action.type) {
    case SHOW_REASON_MODAL:
      return {
        open: true,
        header: action.header,
        subHeader: action.subHeader,
        reasons: action.reasons,
      };
    case HIDE_REASON_MODAL:
      return {
        open: false,
        header: "Confirm",
        subHeader: "Please provide a reason",
        reasons: [],
      };
  }
  return state;
};

const getUpdateQuoteModalOpen = (
  state: boolean = false,
  action: UIActionType
) => {
  switch (action.type) {
    case SHOW_UPDATE_QUOTE_MODAL:
      return true;
    case HIDE_UPDATE_QUOTE_MODAL:
      return false;
  }
  return state;
};

const getAttributeModalOpen = (
  state: boolean = false,
  action: UIActionType
) => {
  switch (action.type) {
    case SHOW_ATTRIBUTE_MODAL:
      return true;
    case HIDE_ATTRIBUTE_MODAL:
      return false;
  }
  return state;
};

const getSkuModalOpen = (state: boolean = false, action: UIActionType) => {
  switch (action.type) {
    case SHOW_SKU_MODAL:
      return true;
    case HIDE_SKU_MODAL:
      return false;
  }
  return state;
};

const getUpdateCreditsModalOpen = (
  state: boolean = false,
  action: UIActionType
) => {
  switch (action.type) {
    case SHOW_UPDATE_CREDITS_MODAL:
      return true;
    case HIDE_UPDATE_CREDITS_MODAL:
      return false;
  }
  return state;
};

export default combineReducers({
  sureModalData: getSureModalData,
  reasonModalData: getReasonModalData,
  loadingScreenOpen: getLoadingScreenOpen,
  updateQuoteModalOpen: getUpdateQuoteModalOpen,
  updateCreditsModalOpen: getUpdateCreditsModalOpen,
  attributeModalOpen: getAttributeModalOpen,
  skuModalOpen: getSkuModalOpen,
});
