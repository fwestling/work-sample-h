import type Entity from "@/data/Entity";
import type { HierarchyNode, Organisation } from "@/data/Hierarchy";

/** Interface for the API client used to fetch organisation hierarchy. */
export default interface HierarchyApi {
	/** Get all organisations */
	getOrganisations(): Organisation[];
	/** Get a single organisation by ID */
	getOrganisation(id: Organisation["id"]): Organisation | undefined;
	/** Get the entire hierarchy "tree" of a given organisation */
	getHierarchy(organisationId: Organisation["id"]): HierarchyNode[];
	/** Get all entities (users, jobs, inventory) for a given organisation */
	getEntities(organisationId: Organisation["id"]): Entity[];
	/** Get a single entity */
	getEntity(entityId: Entity["id"]): Entity | undefined;
}
