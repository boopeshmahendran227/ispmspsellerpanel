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
      children: node.children,
    });
    node.children.forEach((child) => queue.push(child));
    ++i;
  }

  return categories;
};

export const getChildCategories = (
  category: CategoryInterface
): CategoryInterface[] => {
  return category.children.reduce(
    (acc, child) => [...acc, ...flattenCategoryTree(child)],
    []
  );
};
