import { combineReducers } from "redux";
import {
  SHOW_SURE_MODAL,
  HIDE_SURE_MODAL,
  SHOW_LOADING_SCREEN,
  HIDE_LOADING_SCREEN,
  SHOW_REASON_MODAL,
  HIDE_REASON_MODAL,
} from "../constants/ActionTypes";
import { SureModalData, UIActionType, ReasonModalData } from "../types/ui";

const getSureModalData = (
  state: SureModalData = {
    header: "Confirm",
    body: "Are you sure you want to continue?",
    open: false,
    onSure: () => null, // dummy function
  },
  action: UIActionType
) => {
  switch (action.type) {
    case SHOW_SURE_MODAL:
      return {
        open: true,
        header: action.header,
        body: action.body,
        onSure: action.onSure,
      };
    case HIDE_SURE_MODAL:
      return {
        open: false,
        header: "Confirm",
        body: "Are you sure you want to continue?",
        onSure: () => null, // dummy function
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
    open: false,
    onSubmit: (reason: string) => null, // dummy function
  },
  action: UIActionType
) => {
  switch (action.type) {
    case SHOW_REASON_MODAL:
      return {
        open: true,
        header: action.header,
        onSubmit: action.onSubmit,
      };
    case HIDE_REASON_MODAL:
      return {
        open: false,
        header: "Confirm",
        onSubmit: (reason: string) => null, // dummy function
      };
  }
  return state;
};

export default combineReducers({
  sureModalData: getSureModalData,
  reasonModalData: getReasonModalData,
  loadingScreenOpen: getLoadingScreenOpen,
});
