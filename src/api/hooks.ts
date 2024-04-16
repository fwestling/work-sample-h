// This file defines hooks used to interact with the API.
// For this exercise, this is an unnecessary level of abstraction,
// but for a real project, this would allow async data fetching to
// be handled properly.

import Entity from "@/data/Entity";
import { HierarchyNode, Organisation } from "@/data/Hierarchy";
import client from "./sample-client";

type QueryFn<T, Params = void> = (params: Params) => {
  data: T;
  isLoading: boolean;
  error: string | undefined;
};

export const useOrganisations: QueryFn<Organisation[]> = () => {
  return {
    data: client.getOrganisations(),
    isLoading: false,
    error: undefined,
  };
};

export const useOrganisation: QueryFn<Organisation | undefined, number> = (
  id: number
) => {
  return {
    data: client.getOrganisation(id),
    isLoading: false,
    error: undefined,
  };
};

export const useHierarchy: QueryFn<HierarchyNode[], number> = (
  organisationId: number
) => {
  return {
    data: client.getHierarchy(organisationId),
    isLoading: false,
    error: undefined,
  };
};

export const useEntities: QueryFn<Entity[], number> = (
  organisationId: number
) => {
  return {
    data: client.getEntities(organisationId),
    isLoading: false,
    error: undefined,
  };
};

export const useEntity: QueryFn<Entity | undefined, number | undefined> = (
  id?: number
) => {
  if (!id) {
    return { data: undefined, isLoading: false, error: "No ID provided" };
  }
  return { data: client.getEntity(id), isLoading: false, error: undefined };
};
