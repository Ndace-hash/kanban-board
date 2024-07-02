import { Dispatch, SetStateAction } from "react";

export interface Task {
	title: string;
	description: string;
	id: string;
	oldParent?: BoardType;
	currentParent?: BoardType;
	priority?: TaskPriorityLevel;
}

export type SetState<T> = Dispatch<SetStateAction<T>>;

export const BoardNames = {
	BACKLOG: "Back_Log",
	TODO: "To_Dos",
	IN_PROGRESS: "In_Progress",
	COMPLETED: "Completed",
} as const;

export type BoardType = (typeof BoardNames)[keyof typeof BoardNames];

export type BoardProps = {
	setViewAddModal: Dispatch<SetStateAction<boolean>>;
	tasks: Task[];
	setTasks: SetState<{ [k: string]: Task[] }>;
	name: BoardType;
	setCurrentBoard: SetState<BoardType>;
};

export const PriortyLevel = {
	URGENT: 0,
	HIGH: 1,
	NORMAL: 2,
	LOW: 3,
} as const;

export type TaskPriorityLevel =
	(typeof PriortyLevel)[keyof typeof PriortyLevel];
