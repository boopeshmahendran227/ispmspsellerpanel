import { SHOW_SURE_MODAL, HIDE_SURE_MODAL } from "../constants/ActionTypes";

const showSureModal = (header: string, body: string, onSure: () => void) => {
  return {
    type: SHOW_SURE_MODAL,
    header,
    body,
    onSure,
  };
};

const hideSureModal = () => {
  return {
    type: HIDE_SURE_MODAL,
  };
};

export default {
  showSureModal,
  hideSureModal,
};
