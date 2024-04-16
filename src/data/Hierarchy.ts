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
