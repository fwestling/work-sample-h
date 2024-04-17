import { useEntity, useHierarchy } from "@/api/hooks";
import type Entity from "@/data/Entity";
import type { HierarchyNode, Organisation } from "@/data/Hierarchy";
import { getLevel } from "@/data/utils";
import { useMemo, useState } from "react";
import Node from "./Node";

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

  const [level, setLevel] = useState<number>(0);
  const levelNodes = useMemo(
    () => hierarchy.filter((node) => getLevel(node, hierarchy) === level),
    [hierarchy, level]
  );

  const lowestLevel = useMemo(
    () =>
      hierarchy.reduce(
        (acc, node) => Math.max(acc, getLevel(node, hierarchy)),
        0
      ),
    [hierarchy]
  );

  return (
    <div>
      <h3>Hierarchy</h3>
      <select
        value={entity?.id}
        onChange={(evt) => setLevel(Number.parseInt(evt.target.value))}
      >
        {Array.from(Array(lowestLevel + 1)).map((_, lev) => (
          <option key={lev} value={lev} data-testid="entity-option">
            Level {lev}
          </option>
        ))}
      </select>

      <div className="hierarchy">
        {levelNodes.map((node) => (
          <Node
            key={node.id}
            data={node}
            hierarchy={hierarchy}
            onClick={() => onClick(node)}
            highlightId={entity?.teamId}
          />
        ))}
      </div>
    </div>
  );
};

export default HierarchyPicker;
