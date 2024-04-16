import { HierarchyNode, Organisation } from "@/data/Hierarchy";

export default interface HierarchyApi {
    getOrganisation(id: string): Organisation;
    getHierarchy(organisationId: Organisation['id']): HierarchyNode[];
}