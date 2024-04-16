import { useEntity, useHierarchy } from "@/api/hooks";
import type Entity from "@/data/Entity";
import type { HierarchyNode, Organisation } from "@/data/Hierarchy";

type Props = {
  /** Organisation to be looking at */
  organisationId: Organisation["id"];
  /** Entity to be looking at */
  entityId?: Entity["id"];
  /** Callback for when a part of the hierarchy is clicked */
  onClick: (level: HierarchyNode) => void;
};

/**
 * The HierarchyPicker renders an organisation's hierarchy
 * and allows navigation of the hierarchy to select a specific team.
 */
const HierarchyPicker = ({ organisationId, entityId, onClick }: Props) => {
  const { data: hierarchy } = useHierarchy(organisationId);
  const { data: entity } = useEntity(entityId);

  // Keeps the tests from failing due to TS6133
  console.log(hierarchy, entity, onClick);
  return <div>HierarchyPicker</div>;
};

export default HierarchyPicker;
