import type { HierarchyNode } from "@/data/Hierarchy";

type Props = {
  data: HierarchyNode;
  onClick: () => void;
};

const Node = (props: Props) => {
  console.log(props);

  return <div data-testid="hierarchy-node">Node</div>;
};

export default Node;
