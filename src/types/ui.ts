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
  SHOW_SKU_MODAL,
  HIDE_SKU_MODAL,
  DELIVERY_CODE_MODAL_SUBMIT_CLICKED,
  SHOW_DELIVERY_CODE_MODAL,
  HIDE_DELIVERY_CODE_MODAL,
  DELIVERY_CODE_MODAL_CANCEL_CLICKED,
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

interface DeliveryCodeModalSubmitClicked {
  type: typeof DELIVERY_CODE_MODAL_SUBMIT_CLICKED;
  deliveryCode: string;
}

interface DeliveryCodeModalCancelClicked {
  type: typeof DELIVERY_CODE_MODAL_CANCEL_CLICKED;
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

interface ShowDeliveryCodeModalAction {
  type: typeof SHOW_DELIVERY_CODE_MODAL;
}

interface HideDeliveryCodeModalAction {
  type: typeof HIDE_DELIVERY_CODE_MODAL;
}

interface ShowAttributeModalAction {
  type: typeof SHOW_ATTRIBUTE_MODAL;
}

interface HideAttributeModalAction {
  type: typeof HIDE_ATTRIBUTE_MODAL;
}

interface ShowSkuModalAction {
  type: typeof SHOW_SKU_MODAL;
}

interface HideSkuModalAction {
  type: typeof HIDE_SKU_MODAL;
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
  | ShowDeliveryCodeModalAction
  | HideDeliveryCodeModalAction
  | ReasonModalSubmitClicked
  | ReasonModalCancelClicked
  | DeliveryCodeModalSubmitClicked
  | DeliveryCodeModalCancelClicked
  | ShowUpdateQuoteModalAction
  | HideUpdateQuoteModalAction
  | ShowAttributeModalAction
  | HideAttributeModalAction
  | ShowSkuModalAction
  | HideSkuModalAction;

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
