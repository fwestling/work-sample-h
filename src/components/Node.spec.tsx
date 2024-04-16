// Test the Node component

import { render } from "@testing-library/react";
import Node from "./Node";

describe("Node", () => {
  const hierarchyNode = {
    id: 1001,
    name: "Node",
    children: [],
  };

  it("renders the component", () => {
    const { container } = render(
      <Node data={hierarchyNode} onClick={() => {}} />
    );
    expect(container).toBeDefined();
  });

  it("renders a hierarchy-node", () => {
    const { getByTestId } = render(
      <Node data={hierarchyNode} onClick={() => {}} />
    );
    const options = getByTestId("hierarchy-node");
    expect(options).toBeDefined();
  });
});
