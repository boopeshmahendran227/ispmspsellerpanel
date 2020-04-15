import { SHOW_SURE_MODAL, HIDE_SURE_MODAL } from "../constants/ActionTypes";
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

export default {
  showSureModal,
  hideSureModal,
};
