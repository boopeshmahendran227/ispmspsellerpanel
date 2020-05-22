import { CategoryTreeInterface } from "../types/categoryTree";
import { CategoryInterface } from "../types/category";

export const flattenCategoryTree = (
  tree: CategoryTreeInterface
): CategoryInterface[] => {
  const queue = [tree];
  const categories: CategoryInterface[] = [];

  let i = 0;

  while (queue[i]) {
    const node = queue[i];
    categories.push({
      id: node.id,
      name: node.name,
    });
    node.children.forEach((child) => queue.push(child));
    ++i;
  }

  return categories;
};
