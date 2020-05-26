import {
  GET_PRODUCT_DRAFTS_REQUEST,
  SET_DRAFT_CURRENT_PAGE_NUMBER,
} from "../constants/ActionTypes";
import { DraftActionType } from "../types/draft";

const getDrafts = (): DraftActionType => {
  return {
    type: GET_PRODUCT_DRAFTS_REQUEST,
  };
};

const setDraftCurrentPageNumber = (value: number): DraftActionType => {
  return {
    type: SET_DRAFT_CURRENT_PAGE_NUMBER,
    value,
  };
};

export default {
  getDrafts,
  setDraftCurrentPageNumber,
};
