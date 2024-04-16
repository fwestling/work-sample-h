// Test the API hooks

import * as hooks from "@/api/hooks";
import { Organisation } from "@/data/Hierarchy";
import { renderHook } from "@testing-library/react";

describe("API hooks", () => {
  it("can call useOrganisation", async () => {
    const organisationId = 1;

    const { result } = renderHook(() => hooks.useOrganisation(organisationId));

    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toEqual<Organisation>({
      id: 1,
      name: "Dunder Mifflin",
      slug: "dunder-mifflin",
    });
  });

  it("can call useEntities", async () => {
    const organisationId = 1;

    const { result } = renderHook(() => hooks.useEntities(organisationId));

    expect(result.current.error).toBeUndefined();
  });

  it("can call useEntity", async () => {
    const entityId = 1001;

    const { result } = renderHook(() => hooks.useEntity(entityId));

    expect(result.current.error).toBeUndefined();
  });

  it("can call useHierarchy", async () => {
    const organisationId = 1;

    const { result } = renderHook(() => hooks.useHierarchy(organisationId));

    expect(result.current.error).toBeUndefined();
  });

  it("can call useOrganisations", async () => {
    const { result } = renderHook(() => hooks.useOrganisations());

    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toHaveLength(2);
  });
});
