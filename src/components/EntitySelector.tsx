import type Entity from "@/data/Entity";
import type { Organisation } from "@/data/Hierarchy";

type Props = {
	/** ID of the organisation you are looking at */
	organisationId: Organisation["id"];
	/** Callback when an entity is selected */
	onSelect: (entity: Entity) => void;
};

/**
 * Render a selector for choosing which Entity you
 * are operating on
 */
const EntitySelector = ({ organisationId, onSelect }: Props) => {
	return <div>EntitySelector</div>;
};

export default EntitySelector;
