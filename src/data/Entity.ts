import type { Division } from "./Hierarchy";

type EntityType = "user" | "job" | "inventory";

export interface Entity {
	id: number;
	name: string;
	teamId: Division["id"];
	type: EntityType;
}

export interface User extends Entity {
	type: "user";
}

export interface Job extends Entity {
	type: "job";
}

export interface Inventory extends Entity {
	type: "inventory";
}

export default Entity;
