import {
  GET_PRODUCT_DRAFTS_REQUEST,
  SET_DRAFT_CURRENT_PAGE_NUMBER,
} from "../constants/ActionTypes";
import { ProductMiniInterface, ProductResponseInterface } from "./product";

interface GetDraftsAction {
  type: typeof GET_PRODUCT_DRAFTS_REQUEST;
}

interface SetDraftCurrentPageNumberAction {
  type: typeof SET_DRAFT_CURRENT_PAGE_NUMBER;
  value: number;
}

export interface DraftMiniInterface extends ProductMiniInterface {
  status: string;
}

export interface DraftResponseInterface extends ProductResponseInterface {
  status: string;
}

export type DraftActionType = GetDraftsAction | SetDraftCurrentPageNumberAction;
