import { combineReducers } from "redux";
import { SHOW_SURE_MODAL, HIDE_SURE_MODAL } from "../constants/ActionTypes";
import { SureModalData } from "../types/ui";

const getSureModalData = (
  state: SureModalData = {
    header: "Confirm",
    body: "Are you sure you want to continue?",
    open: false,
    onSure: () => null, // dummy function
  },
  action
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

export default combineReducers({
  sureModalData: getSureModalData,
});
