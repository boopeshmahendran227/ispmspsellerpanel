import { HIDE_SURE_MODAL, SHOW_SURE_MODAL } from "../constants/ActionTypes";

interface ShowSureModalAction {
  type: typeof SHOW_SURE_MODAL;
  header: string;
  body: string;
  onSure: () => void;
}

interface HideSureModalAction {
  type: typeof HIDE_SURE_MODAL;
}

export type UIActionType = ShowSureModalAction | HideSureModalAction;

export interface SureModalData {
  open: boolean;
  header: string;
  body: string;
  onSure: () => void;
}
