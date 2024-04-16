// Test the util functions

import * as utils from "@/data/utils";
import { Division, Organisation, Team } from "./Hierarchy";

describe("getLevel utility", () => {
  it("returns 0 for organisation nodes", () => {
    const node: Organisation = {
      id: 1001,
      name: "Node",
      slug: "node",
    };

    const level = utils.getLevel(node, [node]);
    expect(level).toBe(0);
  });

  it("returns 1 for a direct child node", () => {
    const node: Organisation = {
      id: 1001,
      name: "Node",
      slug: "node",
    };

    const child: Division = {
      id: 1002,
      name: "Child",
      parentId: node.id,
      organisationId: node.id,
    };

    const level = utils.getLevel(child, [node, child]);
    expect(level).toBe(1);
  });

  it("returns 2 for a grandchild node", () => {
    const node: Organisation = {
      id: 1001,
      name: "Node",
      slug: "node",
    };

    const child: Division = {
      id: 1002,
      name: "Child",
      parentId: node.id,
      organisationId: node.id,
    };

    const grandchild: Team = {
      id: 1003,
      name: "Grandchild",
      divisionId: child.id,
    };

    const level = utils.getLevel(grandchild, [node, child, grandchild]);
    expect(level).toBe(2);
  });
});

describe("getAllBelow utility", () => {
  it("returns root for a single node", () => {
    const node: Organisation = {
      id: 1001,
      name: "Node",
      slug: "node",
    };

    const nodes = utils.getAllBelow(node, [node]);
    expect(nodes).toEqual([node]);
  });

  it("returns leaf node for grandchild", () => {
    const node: Organisation = {
      id: 1001,
      name: "Node",
      slug: "node",
    };

    const child: Division = {
      id: 1002,
      name: "Child",
      parentId: node.id,
      organisationId: node.id,
    };

    const grandchild: Team = {
      id: 1003,
      name: "Grandchild",
      divisionId: child.id,
    };

    const nodes = utils.getAllBelow(grandchild, [node, child, grandchild]);
    expect(nodes).toEqual([grandchild]);
  });

  it("returns tree under root", () => {
    const node: Organisation = {
      id: 11,
      name: "Node",
      slug: "node",
    };

    const child1: Division = {
      id: 101,
      name: "Child",
      parentId: node.id,
      organisationId: node.id,
    };
    const child2: Division = {
      id: 102,
      name: "Child",
      parentId: node.id,
      organisationId: node.id,
    };

    const grandchild1: Team = {
      id: 1001,
      name: "Grandchild",
      divisionId: child1.id,
    };
    const grandchild2: Team = {
      id: 1002,
      name: "Grandchild",
      divisionId: child1.id,
    };
    const grandchild3: Team = {
      id: 1003,
      name: "Grandchild",
      divisionId: child2.id,
    };
    const grandchild4: Team = {
      id: 1004,
      name: "Grandchild",
      divisionId: child2.id,
    };

    const nodes = utils.getAllBelow(child1, [
      node,
      child1,
      child2,
      grandchild1,
      grandchild2,
      grandchild3,
      grandchild4,
    ]);
    expect(nodes).toEqual([child1, grandchild1, grandchild2]);
  });
});
