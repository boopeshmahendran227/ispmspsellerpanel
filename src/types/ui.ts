import {
  HIDE_SURE_MODAL,
  SHOW_SURE_MODAL,
  SHOW_LOADING_SCREEN,
  HIDE_LOADING_SCREEN,
} from "../constants/ActionTypes";

interface ShowSureModalAction {
  type: typeof SHOW_SURE_MODAL;
  header: string;
  body: string;
  onSure: () => void;
}

interface HideSureModalAction {
  type: typeof HIDE_SURE_MODAL;
}

interface ShowLoadingScreenAction {
  type: typeof SHOW_LOADING_SCREEN;
}

interface HideLoadingScreenAction {
  type: typeof HIDE_LOADING_SCREEN;
}

export type UIActionType =
  | ShowSureModalAction
  | HideSureModalAction
  | ShowLoadingScreenAction
  | HideLoadingScreenAction;

export interface SureModalData {
  open: boolean;
  header: string;
  body: string;
  onSure: () => void;
}
