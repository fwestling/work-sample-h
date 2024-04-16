// Test the EntitySelector component

import { render } from "@testing-library/react";
import EntitySelector from "./EntitySelector";

describe("EntitySelector", () => {
  it("renders the component", () => {
    const { container } = render(
      <EntitySelector organisationId={1} onSelect={() => {}} />
    );
    expect(container).toBeDefined();
  });

  it("renders a list of entity-options", () => {
    const { getAllByTestId } = render(
      <EntitySelector organisationId={1} onSelect={() => {}} />
    );
    const options = getAllByTestId("entity-option");
    expect(options.length).toBeGreaterThan(0);
  });
});
