import { SHOW_SURE_MODAL, HIDE_SURE_MODAL } from "../constants/ActionTypes";

const showSureModal = () => {
  return {
    type: SHOW_SURE_MODAL,
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
