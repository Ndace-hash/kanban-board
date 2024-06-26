import { Dispatch, SetStateAction } from "react";

export interface Task {
	title: string;
	description: string;
	id: string;
}

export type SetState<T> = Dispatch<SetStateAction<T>>;

export enum Boards {
	BACKLOG = "Back_Log",
	TODO = "To_Dos",
	IN_PROGRESS = "In_Progress",
	COMPLETED = "Completed",
}
