// Test the HierarchyPicker component

import { render } from "@testing-library/react";
import HierarchyPicker from "./HierarchyPicker";

describe("HierarchyPicker", () => {
  it("renders the component", () => {
    const { container } = render(
      <HierarchyPicker organisationId={1} onClick={() => {}} entityId={1001} />
    );
    expect(container).toBeDefined();
  });

  it("renders a list of hierarchy-nodes", () => {
    const { getAllByTestId } = render(
      <HierarchyPicker organisationId={1} onClick={() => {}} entityId={1001} />
    );
    const options = getAllByTestId("hierarchy-node");
    expect(options.length).toBeGreaterThan(0);
  });
});
