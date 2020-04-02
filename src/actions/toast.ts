import { ADD_TOAST, REMOVE_TOAST } from "../constants/ActionTypes";
import { ToastDataInterface, ToastActionType } from "../types/toast";

const addToast = (toast: ToastDataInterface): ToastActionType => {
  return {
    type: ADD_TOAST,
    toast: toast
  };
};

const removeToast = (id: string): ToastActionType => {
  return {
    type: REMOVE_TOAST,
    id: id
  };
};

export default {
  addToast,
  removeToast
};
