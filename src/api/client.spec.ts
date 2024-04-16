// Test the client API

import type Entity from "@/data/Entity";
import { isDivision } from "@/data/Hierarchy";
import SampleData from "@/data/sample.json";
import client from "./sample-client";

describe("Hierarchy API client", () => {
	it("returns organisations with correct type", () => {
		const organisations = client.getOrganisations();
		expect(organisations).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: expect.any(Number),
					name: expect.any(String),
				}),
			]),
		);
	});

	it("returns a single organisation by ID", () => {
		const org1 = SampleData.organisations.find((org) => org.id === 1);
		const clientOrg = client.getOrganisation(1);
		expect(clientOrg).toEqual(org1);
	});

	it("returns both divisions and teams with correct type from hierarchy", () => {
		const hierarchy = client.getHierarchy(1);
		expect(hierarchy).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: expect.any(Number),
					name: expect.any(String),
					organisationId: expect.any(Number),
				}),
			]),
		);
	});

	it("returns only divisions from the correct organisation", () => {
		const hierarchy = client.getHierarchy(1);
		const divisions = hierarchy.filter((div) => isDivision(div));
		expect(divisions).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					organisationId: 1,
				}),
			]),
		);
	});

	it("returns all entities for a given organisation", () => {
		const entities = client.getEntities(1);
		const divisions = SampleData.divisions
			.filter((div) => div.organisationId === 1)
			.map((div) => div.id);
		const teams = SampleData.teams
			.filter((team) => divisions.includes(team.divisionId))
			.map((t) => t.id);
		expect(entities).toEqual(
			(SampleData.entities as Entity[]).filter((e) => teams.includes(e.teamId)),
		);
	});
});
