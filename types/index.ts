import { Dispatch, SetStateAction } from "react";

export interface Task {
	title: string;
	description: string;
	id: string;
	oldParent?: BoardType;
	currentParent?: BoardType;
}

export type SetState<T> = Dispatch<SetStateAction<T>>;

export const BoardNames = {
	BACKLOG: "Back_Log",
	TODO: "To_Dos",
	IN_PROGRESS: "In_Progress",
	COMPLETED: "Completed",
} as const;

export type BoardType = (typeof BoardNames)[keyof typeof BoardNames];
