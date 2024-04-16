import { Team } from "./Hierarchy";

export type User = {
    id: string;
    name: string;
    teamId: Team['id'];
}
export type Job = {
    id: string;
    name: string;
    teamId: Team['id'];
}
export type Inventory = {
    id: string;
    name: string;
    teamId: Team['id'];
}

type Entity = User | Job | Inventory;

export default Entity;