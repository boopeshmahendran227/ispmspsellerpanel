import {
  HIDE_SURE_MODAL,
  SHOW_SURE_MODAL,
  SHOW_LOADING_SCREEN,
  HIDE_LOADING_SCREEN,
  SHOW_REASON_MODAL,
  HIDE_REASON_MODAL,
  SHOW_UPDATE_QUOTE_MODAL,
  HIDE_UPDATE_QUOTE_MODAL,
  SURE_MODAL_SURE_CLICKED,
  SURE_MODAL_CANCEL_CLICKED,
  REASON_MODAL_SUBMIT_CLICKED,
  REASON_MODAL_CANCEL_CLICKED,
  SHOW_ATTRIBUTE_MODAL,
  HIDE_ATTRIBUTE_MODAL,
} from "../constants/ActionTypes";

interface ShowSureModalAction {
  type: typeof SHOW_SURE_MODAL;
  header: string;
  body: string;
}

interface HideSureModalAction {
  type: typeof HIDE_SURE_MODAL;
}

interface SureModalSureClickedAction {
  type: typeof SURE_MODAL_SURE_CLICKED;
}

interface SureModalCancelClickedAction {
  type: typeof SURE_MODAL_CANCEL_CLICKED;
}

interface ShowReasonModalAction {
  type: typeof SHOW_REASON_MODAL;
  header: string;
  subHeader: string;
  reasons: string[];
}

interface HideReasonModalAction {
  type: typeof HIDE_REASON_MODAL;
}

interface ReasonModalSubmitClicked {
  type: typeof REASON_MODAL_SUBMIT_CLICKED;
  reason: string;
}

interface ReasonModalCancelClicked {
  type: typeof REASON_MODAL_CANCEL_CLICKED;
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

interface ShowAttributeModalAction {
  type: typeof SHOW_ATTRIBUTE_MODAL;
}

interface HideAttributeModalAction {
  type: typeof HIDE_ATTRIBUTE_MODAL;
}

export type UIActionType =
  | ShowSureModalAction
  | HideSureModalAction
  | SureModalSureClickedAction
  | SureModalCancelClickedAction
  | ShowLoadingScreenAction
  | HideLoadingScreenAction
  | ShowReasonModalAction
  | HideReasonModalAction
  | ReasonModalSubmitClicked
  | ReasonModalCancelClicked
  | ShowUpdateQuoteModalAction
  | HideUpdateQuoteModalAction
  | ShowAttributeModalAction
  | HideAttributeModalAction;

export interface SureModalData {
  open: boolean;
  header: string;
  body: string;
}

export interface ReasonModalData {
  open: boolean;
  header: string;
  subHeader: string;
  reasons: string[];
}
