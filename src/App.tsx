import { useEffect, useState } from "react";
import "./App.css";
import client from "./api/sample-client";
import type { Organisation } from "./data/Hierarchy";

function App() {
	const [organisationId] = useState<Organisation["id"]>(1);

	const [organisation, setOrganisation] = useState<Organisation>();

	useEffect(() => {
		setOrganisation(client.getOrganisation(organisationId));
	}, [organisationId]);

	return (
		<>
			<h1>Hatch: Move within the hierarchy</h1>
			{!organisation ? (
				<span>Organisation not defined</span>
			) : (
				<div>
					<h2>{organisation.name}</h2>
				</div>
			)}
		</>
	);
}

export default App;
