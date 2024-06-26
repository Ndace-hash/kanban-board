"use client";
import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import "./Board.modules.css";

import TaskCard from "./TaskCard";
import AddIcon from "@/components/Icons/MaterialSymbolsAddRounded";
import { ReactSortable } from "react-sortablejs";

import { Task, SetState, BoardType } from "@/../types";

interface props {
	setViewAddModal: Dispatch<SetStateAction<boolean>>;
	tasks?: Task[] | [];
	setTasks: SetState<{ [k: string]: Task[] }>;
	name: BoardType;
	setCurrentBoard: SetState<BoardType>;
}

export default function Board({
	setViewAddModal,
	setCurrentBoard,
	tasks,
	setTasks,
	name,
}: props) {
	const [tasksList, setTasksList] = useState([]);
	const handleAddClick: (
		board: BoardType
	) => MouseEventHandler<HTMLButtonElement> = (board) => {
		return (e) => {
			e.preventDefault();
			setViewAddModal(true);
			setCurrentBoard(board);
		};
	};
	const deleteTask = (id: string) => {
		const action: MouseEventHandler<HTMLButtonElement> = (event) => {
			event.stopPropagation();
			setTasks((tasks) => {
				let newTasksArray: Task[] = [];
				for (let task of tasks[name]) {
					if (task.id != id) newTasksArray.push(task);
				}
				const newTasks = {
					...tasks,
					[name]: [...newTasksArray],
				};
				localStorage.setItem("tasks", JSON.stringify(newTasks));
				return newTasks;
			});
		};
		return action;
	};

	return (
		<section className="shadow-lg border w-[350px] rounded-md h-80 max-h-96 overflow-auto">
			<div className="border-b flex justify-between items-center py-2 px-3">
				<h2 className="">{name.replaceAll("_", " ")}</h2>
				<button
					className="text-xs border p-1 rounded-full shadow-md flex justify-center items-center"
					onClick={(e) => {
						return handleAddClick(name)(e);
					}}
				>
					<AddIcon className="text-xl" />
					<span className="sr-only">add tasks</span>
				</button>
			</div>
			<div className="py-3">
				<ReactSortable
					list={tasksList}
					setList={setTasksList}
					group={"taskBoard"}
				>
					{tasks?.map((task) => (
						<TaskCard
							task={task}
							handleDeleteClick={() => deleteTask(task.id)}
							key={task.id}
						/>
					))}
				</ReactSortable>
			</div>
		</section>
	);
}
