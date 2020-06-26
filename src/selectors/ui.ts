import { RootState } from "../reducers";
import { createSelector } from "reselect";
import { SureModalData, ReasonModalData } from "../types/ui";

const getSureModalData = createSelector(
  (state: RootState) => state.ui,
  (ui): SureModalData => ui.sureModalData
);

const getReasonModalData = createSelector(
  (state: RootState) => state.ui,
  (ui): ReasonModalData => ui.reasonModalData
);

const getLoadingScreenOpen = createSelector(
  (state: RootState) => state.ui,
  (ui): boolean => ui.loadingScreenOpen
);

const getUpdateQuoteModalOpen = createSelector(
  (state: RootState) => state.ui,
  (ui): boolean => ui.updateQuoteModalOpen
);

const getAttributeModalOpen = createSelector(
  (state: RootState) => state.ui,
  (ui): boolean => ui.attributeModalOpen
);

const getSkuModalOpen = createSelector(
  (state: RootState) => state.ui,
  (ui): boolean => ui.skuModalOpen
);

const getDeliveryCodeModalOpen = createSelector(
  (state: RootState) => state.ui,
  (ui): boolean => ui.deliveryCodeModalOpen
);

const getProductOrdersModalOpen = createSelector(
  (state: RootState) => state.ui,
  (ui): boolean => ui.productOrdersModalOpen
);

export {
  getSureModalData,
  getLoadingScreenOpen,
  getReasonModalData,
  getUpdateQuoteModalOpen,
  getAttributeModalOpen,
  getSkuModalOpen,
  getDeliveryCodeModalOpen,
  getProductOrdersModalOpen,
};
