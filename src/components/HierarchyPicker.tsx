import { useEntity, useHierarchy } from "@/api/hooks";
import type Entity from "@/data/Entity";
import {
  HierarchyNode,
  isTeam,
  type Organisation,
  type Team,
} from "@/data/Hierarchy";
import { getAllBelow, getLevel } from "@/data/utils";
import { Fragment, useCallback, useMemo, useState } from "react";
import Node from "./Node";

type Props = {
  /** Organisation to be looking at */
  organisationId: Organisation["id"];
  /** Entity to be looking at */
  entityId?: Entity["id"];
  /** Callback for when a part of the hierarchy is clicked */
  onSelect: (level: Team) => void;
};

/**
 * The HierarchyPicker renders an organisation's hierarchy
 * and allows navigation of the hierarchy to select a specific team.
 */
const HierarchyPicker = ({
  organisationId,
  entityId,
  onSelect: onClick,
}: Props) => {
  const { data: hierarchy } = useHierarchy(organisationId);
  const { data: entity } = useEntity(entityId);

  const [root, setRoot] = useState<HierarchyNode | null>(null);
  const tree = useMemo(() => {
    if (!root) {
      return hierarchy;
    }
    return getAllBelow(root, hierarchy);
  }, [root, hierarchy]);

  const [level, setLevel] = useState<number>(0);
  const levelNodes = useMemo(
    () => tree.filter((node) => getLevel(node, tree) === level),
    [tree, level]
  );

  const lowestLevel = useMemo(
    () => tree.reduce((acc, node) => Math.max(acc, getLevel(node, tree)), 0),
    [tree]
  );

  const handleClick = useCallback(
    (node: HierarchyNode) => {
      if (isTeam(node)) onClick(node as Team);
      else setRoot(node);
    },
    [onClick]
  );

  return (
    <div>
      <h3>Hierarchy</h3>
      {root ? (
        <Fragment>
          <button onClick={() => setRoot(null)}>Zoom out</button> <br />
          <br />
        </Fragment>
      ) : null}
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
            hierarchy={tree}
            onClick={handleClick}
            highlightId={entity?.teamId}
          />
        ))}
      </div>
    </div>
  );
};

export default HierarchyPicker;
