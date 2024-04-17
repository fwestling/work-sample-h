import { useCallback, useEffect, useState } from "react";
import "./App.css";
import client from "./api/sample-client";
import EntitySelector from "./components/EntitySelector";
import HierarchyPicker from "./components/HierarchyPicker";
import Entity from "./data/Entity";
import type { Organisation, Team } from "./data/Hierarchy";

function App() {
  const [organisationId] = useState<Organisation["id"]>(1);

  const [organisation, setOrganisation] = useState<Organisation>();

  useEffect(() => {
    setOrganisation(client.getOrganisation(organisationId));
  }, [organisationId]);

  const [entity, setEntity] = useState<Entity | undefined>();

  const handleSelect = useCallback(
    (team: Team) => {
      if (entity) {
        if (entity.teamId === team.id)
          alert(`${entity.name} is already in ${team.name}`);
        else alert(`Moving ${entity.name} to ${team.name}`);
      } else {
        alert("Please select an entity to move.");
      }
    },
    [entity]
  );

  return (
    <>
      <h2>Hatch: Move within the hierarchy</h2>
      {!organisation ? (
        <span>Organisation not defined</span>
      ) : (
        <div className="column">
          <h3>{organisation.name}</h3>
          <p>
            Use this view to locate an entity within {organisation.name} and
            move them to another division. <br />
            Select an entity to see where they are located. <br />
            Click on another team to move them, or click on a division to filter
            the hierarchy to just that division.
          </p>
          <span>Entity to move:</span>
          <EntitySelector
            onSelect={setEntity}
            organisationId={organisation.id}
          />
          <HierarchyPicker
            onSelect={handleSelect}
            entityId={entity?.id}
            organisationId={organisation.id}
          />
        </div>
      )}
    </>
  );
}

export default App;
