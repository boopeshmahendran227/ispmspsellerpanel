import { ADD_TOAST, REMOVE_TOAST } from "../constants/ActionTypes";
import { ToastDataInterface } from "../types/toast";
import { v1 as uuid } from "uuid";

const toastReducer = (state: ToastDataInterface[] = [], action) => {
  switch (action.type) {
    case ADD_TOAST:
      const id = uuid();
      const toast = action.toast;

      return [
        ...state,
        {
          id,
          type: toast.type,
          msg: toast.msg,
          duration: toast.duration || 4000
        }
      ];
    case REMOVE_TOAST:
      return state.filter(toast => toast.id !== action.id);
  }

  return state;
};

export default toastReducer;
