import { ProductMiniInterface, ProductResponseInterface } from "./product";

export interface DraftMiniInterface extends ProductMiniInterface {
  status: string;
}

export interface DraftResponseInterface extends ProductResponseInterface {
  status: string;
}
