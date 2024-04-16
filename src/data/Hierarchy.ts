export interface Organisation {
    id: string;
    name: string;
}

export interface Division {
    organisationId: Organisation['id'];
    id: string;
    name: string;
    parentId: string;
}

export interface Team {
    id: string;
    name: string;
    divisionId: string;
}

export type HierarchyNode = Organisation | Division | Team; 