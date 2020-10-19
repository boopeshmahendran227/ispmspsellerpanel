import { PaymentMode } from "types/invoice";
import { UPDATE_SETTINGS_REQUEST } from "src/constants/ActionTypes";

export enum ShipmentMode {
  Self = "Self",
  Shiprocket = "Shiprocket",
}

export interface SettingsInterface {
  restrictedPaymentModes: PaymentMode[];
  shipmentMode: ShipmentMode;
}

interface UpdateSettingsAction {
  type: typeof UPDATE_SETTINGS_REQUEST;
  settings: SettingsInterface;
}

export type SettingsActionType = UpdateSettingsAction;
