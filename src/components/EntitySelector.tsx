import { useEntities } from "@/api/hooks";
import type Entity from "@/data/Entity";
import type { Organisation } from "@/data/Hierarchy";
import { useEffect, useState } from "react";

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
  const { data: entities, isLoading, error } = useEntities(organisationId);
  const [entity, setEntity] = useState<Entity | undefined>();

  useEffect(() => {
    if (entity) {
      onSelect(entity);
    }
  }, [entity, onSelect]);

  return error ? (
    <span>Error: {error}</span>
  ) : isLoading ? (
    <span>Loading...</span>
  ) : (
    <select
      value={entity?.id}
      onChange={(evt) =>
        setEntity(
          entities.find((ent) => ent.id.toString() === evt.target.value)
        )
      }
    >
      <option value={undefined}>Select</option>
      {(entities ?? []).map((entity) => (
        <option key={entity.id} value={entity.id} data-testid="entity-option">
          {entity.name} ({entity.type})
        </option>
      ))}
    </select>
  );
};

export default EntitySelector;
