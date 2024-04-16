import type Entity from "@/data/Entity";
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
			...SampleData.divisions.filter(
				(div) => div.organisationId === organisationId,
			),
			...SampleData.teams.filter((team) => team.divisionId === organisationId),
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
			teams.includes(e.teamId),
		);
	},
};

export default client;
