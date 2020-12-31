import { PaymentMode } from "types/invoice";
import { UPDATE_SETTINGS_REQUEST } from "src/constants/ActionTypes";

export enum ShipmentMode {
  Self = "Self",
  Shiprocket = "Shiprocket",
}

export enum OrderStatus {
  Created = "Created",
  SellerProcessing = "SellerProcessing",
  Shipping = "Shipping",
  ShippingCompleted = "ShippingCompleted",
  PackageReadyForCollection = "PackageReadyForCollection",
}

export interface ManufacturerConfig {
  orderStateDto: OrderStatus;
  advancePaymentPercentage: number;
}
export interface SettingsInterface {
  restrictedPaymentModes: PaymentMode[];
  shipmentMode: ShipmentMode;
  manufacturerConfig: ManufacturerConfig[];
  restrictedPincodes: string[];
}

interface UpdateSettingsAction {
  type: typeof UPDATE_SETTINGS_REQUEST;
  settings: SettingsInterface;
}

export type SettingsActionType = UpdateSettingsAction;
