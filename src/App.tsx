import { useEffect, useState } from "react";
import "./App.css";
import client from "./api/sample-client";
import EntitySelector from "./components/EntitySelector";
import HierarchyPicker from "./components/HierarchyPicker";
import Entity from "./data/Entity";
import type { Organisation } from "./data/Hierarchy";

function App() {
  const [organisationId] = useState<Organisation["id"]>(1);

  const [organisation, setOrganisation] = useState<Organisation>();

  useEffect(() => {
    setOrganisation(client.getOrganisation(organisationId));
  }, [organisationId]);

  const [entity, setEntity] = useState<Entity | undefined>();

  return (
    <>
      <h2>Hatch: Move within the hierarchy</h2>
      {!organisation ? (
        <span>Organisation not defined</span>
      ) : (
        <div>
          <h3>{organisation.name}</h3>
          <span>Entity to move:</span>
          <EntitySelector
            onSelect={setEntity}
            organisationId={organisation.id}
          />
          {!entity ? <span>Please select an entity</span> : null}

          <HierarchyPicker
            onClick={() => {}}
            entityId={entity?.id}
            organisationId={organisation.id}
          />
        </div>
      )}
    </>
  );
}

export default App;
