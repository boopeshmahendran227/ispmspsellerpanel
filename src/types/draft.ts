import {
  GET_PRODUCT_DRAFTS_REQUEST,
  SET_DRAFT_CURRENT_PAGE_NUMBER,
} from "../constants/ActionTypes";

interface GetDraftsAction {
  type: typeof GET_PRODUCT_DRAFTS_REQUEST;
}

interface SetDraftCurrentPageNumberAction {
  type: typeof SET_DRAFT_CURRENT_PAGE_NUMBER;
  value: number;
}

export interface DraftMetadataInterface {
  totalItems: number;
  currentPageNumber: number;
  currentPageSize: number;
  totalPages: number;
}

export type DraftActionType = GetDraftsAction | SetDraftCurrentPageNumberAction;
