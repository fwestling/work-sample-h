import { isDivision, isTeam, type HierarchyNode } from "@/data/Hierarchy";
import { getAllBelow, getLevel } from "@/data/utils";
import { useEffect, useMemo, useState } from "react";

type Props = {
  data: HierarchyNode;
  hierarchy: HierarchyNode[];
  onClick: () => void;
};

const Node = ({ data, hierarchy }: Props) => {
  const [tree, setTree] = useState<HierarchyNode[]>(
    getAllBelow(data, hierarchy)
  );

  useEffect(() => {
    setTree(getAllBelow(data, hierarchy));
  }, [data, hierarchy]);

  // Only render the first level, as the rest will be rendered by the children
  const levelNodes = useMemo(
    () => tree.filter((node) => getLevel(node, tree) === 1),
    [tree]
  );

  return (
    <div data-testid="hierarchy-node" className="node">
      <div className="node-row">
        <button
          className={
            isDivision(tree[0])
              ? "division"
              : isTeam(tree[0])
              ? "team"
              : "organisation"
          }
        >
          {tree[0].id}: {tree[0].name}
        </button>
      </div>
      <div
        className={
          levelNodes.filter((t) => t.id !== data.id).every((t) => isTeam(t))
            ? "node-column"
            : "node-row"
        }
      >
        {levelNodes
          .filter((t) => t.id !== data.id)
          .map((t) => (
            <Node data={t} key={t.id} hierarchy={tree} onClick={() => {}} />
          ))}
      </div>
    </div>
  );
};

export default Node;
