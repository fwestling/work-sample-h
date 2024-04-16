import type Entity from "@/data/Entity";
import type { HierarchyNode, Organisation } from "@/data/Hierarchy";

type Props = {
  /** Organisation to be looking at */
  organisationId: Organisation["id"];
  /** Entity to be looking at */
  entityId: Entity["id"];
  /** Callback for when a part of the hierarchy is clicked */
  onClick: (level: HierarchyNode) => void;
};

/**
 * The HierarchyPicker renders an organisation's hierarchy
 * and allows navigation of the hierarchy to select a specific team.
 */
const HierarchyPicker = (props: Props) => {
  console.log(props);
  return <div>HierarchyPicker</div>;
};

export default HierarchyPicker;
