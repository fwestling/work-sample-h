// Test the Node component

import { Division } from "@/data/Hierarchy";
import { render } from "@testing-library/react";
import Node from "./Node";

describe("Node", () => {
  const hierarchyNode: Division = {
    id: 1001,
    name: "Node",
    organisationId: 1,
    parentId: undefined,
  };

  it("renders the component", () => {
    const { container } = render(
      <Node
        data={hierarchyNode}
        hierarchy={[hierarchyNode]}
        onClick={() => {}}
      />
    );
    expect(container).toBeDefined();
  });

  it("renders a hierarchy-node", () => {
    const { getByTestId } = render(
      <Node
        data={hierarchyNode}
        onClick={() => {}}
        hierarchy={[hierarchyNode]}
      />
    );
    const options = getByTestId("hierarchy-node");
    expect(options).toBeDefined();
  });
});
