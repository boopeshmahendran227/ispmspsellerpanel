import { ADD_TOAST, REMOVE_TOAST } from "../constants/ActionTypes";

interface AddToastAction {
  type: typeof ADD_TOAST;
  toast: ToastDataInterface;
}

interface RemoveToastAction {
  type: typeof REMOVE_TOAST;
  id: string;
}

export type ToastActionType = AddToastAction | RemoveToastAction;

export enum ToastType {
  success,
  error,
  info,
  notification
}

export interface ToastDataInterface {
  id?: string;
  type: ToastType;
  header?: string;
  msg: string;
  duration?: number;
}
