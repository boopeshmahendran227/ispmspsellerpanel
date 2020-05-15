import {
  HIDE_SURE_MODAL,
  SHOW_SURE_MODAL,
  SHOW_LOADING_SCREEN,
  HIDE_LOADING_SCREEN,
  SHOW_REASON_MODAL,
  HIDE_REASON_MODAL,
  SHOW_UPDATE_QUOTE_MODAL,
  HIDE_UPDATE_QUOTE_MODAL,
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

interface ShowReasonModalAction {
  type: typeof SHOW_REASON_MODAL;
  header: string;
  subHeader: string;
  reasons: string[];
  onSubmit: (reason: string) => void;
}

interface HideReasonModalAction {
  type: typeof HIDE_REASON_MODAL;
}

interface ShowLoadingScreenAction {
  type: typeof SHOW_LOADING_SCREEN;
}

interface HideLoadingScreenAction {
  type: typeof HIDE_LOADING_SCREEN;
}

interface ShowUpdateQuoteModalAction {
  type: typeof SHOW_UPDATE_QUOTE_MODAL;
}

interface HideUpdateQuoteModalAction {
  type: typeof HIDE_UPDATE_QUOTE_MODAL;
}

export type UIActionType =
  | ShowSureModalAction
  | HideSureModalAction
  | ShowLoadingScreenAction
  | HideLoadingScreenAction
  | ShowReasonModalAction
  | HideReasonModalAction
  | ShowUpdateQuoteModalAction
  | HideUpdateQuoteModalAction;

export interface SureModalData {
  open: boolean;
  header: string;
  body: string;
  onSure: () => void;
}

export interface ReasonModalData {
  open: boolean;
  header: string;
  subHeader: string;
  reasons: string[];
  onSubmit: (reason: string) => void;
}
