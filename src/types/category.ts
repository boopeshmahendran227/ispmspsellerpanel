import { CategoryTreeInterface } from "./categoryTree";

export interface CategoryInterface {
  id: number;
  name: string;
  children: CategoryTreeInterface[];
}
