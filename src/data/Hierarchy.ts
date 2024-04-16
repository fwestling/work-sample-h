export interface Organisation {
	id: number;
	name: string;
}

export interface Division {
	organisationId: Organisation["id"];
	id: number;
	name: string;
	parentId: Division["id"];
}

export interface Team {
	id: number;
	name: string;
	divisionId: Division["id"];
}

export type HierarchyNode = Organisation | Division | Team;

export const isOrganisation = (node: HierarchyNode): node is Organisation =>
	(node as Organisation).id !== undefined;

export const isDivision = (node: HierarchyNode): node is Division =>
	(node as Division).organisationId !== undefined;

export const isTeam = (node: HierarchyNode): node is Team =>
	(node as Team).divisionId !== undefined;
