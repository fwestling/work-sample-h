import {
  Division,
  HierarchyNode,
  Team,
  isDivision,
  isOrganisation,
  isTeam,
} from "./Hierarchy";

/**
 * Calculate the "level" of the given node in the given hierarchy;
 * this level should start at 0 at the top of the tree.
 * @param node The node to get the level of
 * @param hierarchy The hierarchy to search through
 */
export const getLevel = (
  node: HierarchyNode,
  hierarchy: HierarchyNode[]
): number => {
  // Since it always increments, we can start at -1
  let level = -1;
  let currentNode: HierarchyNode | undefined = node;
  // Once you reach the top of the tree, stop.
  while (currentNode !== undefined) {
    if (isOrganisation(currentNode)) {
      currentNode = undefined;
      level++;
      break;
    }
    if (isDivision(currentNode)) {
      const div = currentNode as Division;
      let nextNode: HierarchyNode | undefined = undefined;
      nextNode = hierarchy.find((n) => n.id === div.parentId);
      if (!nextNode)
        currentNode = hierarchy.find((n) => n.id === div.organisationId);
      currentNode = nextNode;
    } else if (isTeam(currentNode as HierarchyNode)) {
      currentNode = hierarchy.find(
        (n) => n.id === (currentNode as Team).divisionId
      )!;
    }
    level++;
  }
  return level;
};

/**
 * Return all nodes below the given node in the given hierarchy.
 * All returned nodes should be in the "tree" with the given node as the root node
 * @param root The node to start at
 * @param hierarchy The hierarchy to search through
 */
export const getAllBelow = (
  root: HierarchyNode,
  hierarchy: HierarchyNode[]
): HierarchyNode[] => {
  const nodes: HierarchyNode[] = [];
  const queue: HierarchyNode[] = [root];
  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    nodes.push(currentNode);
    if (isDivision(currentNode)) {
      const children = hierarchy.filter(
        (n) =>
          (isTeam(n) && n.divisionId === currentNode.id) ||
          (isDivision(n) && n.parentId === currentNode.id)
      );
      queue.push(...children);
    } else if (isOrganisation(currentNode)) {
      const children = hierarchy.filter(
        (n) => isDivision(n) && n.organisationId === currentNode.id
      );
      queue.push(...children);
    }
  }
  return nodes.filter((x, i, a) => a.indexOf(x) === i);
};
