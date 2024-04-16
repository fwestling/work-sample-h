import type Entity from "@/data/Entity";
import { Division, Organisation, Team } from "@/data/Hierarchy";
import SampleData from "@/data/sample.json";
import type HierarchyApi from "./hierarchy.interface";

const client: HierarchyApi = {
  getOrganisations: () => {
    return SampleData.organisations;
  },

  getOrganisation: (id) => {
    return SampleData.organisations.find((org) => org.id === id);
  },

  getHierarchy: (organisationId) => {
    return [
      SampleData.organisations.find(
        (org) => org.id === organisationId
      ) as Organisation,
      ...(SampleData.divisions.filter(
        (div) => div.organisationId === organisationId
      ) as Division[]),
      ...(SampleData.teams.filter(
        (team) => team.divisionId === organisationId
      ) as Team[]),
    ];
  },

  getEntities: (organisationId) => {
    const divisions = SampleData.divisions
      .filter((div) => div.organisationId === organisationId)
      .map((div) => div.id);
    const teams = SampleData.teams
      .filter((team) => divisions.includes(team.divisionId))
      .map((t) => t.id);
    return (SampleData.entities as Entity[]).filter((e) =>
      teams.includes(e.teamId)
    );
  },

  getEntity: (entityId) => {
    return SampleData.entities.find(
      (entity) => entity.id === entityId
    ) as Entity;
  },
};

export default client;
