"use client";
import { Dispatch, FC, MouseEventHandler, SetStateAction } from "react";
import "./Board.modules.css";

import TaskCard from "./TaskCard";
import AddIcon from "@/components/Icons/MaterialSymbolsAddRounded";
import { Task, SetState, BoardType } from "@/../types";
import { ReactSortable } from "react-sortablejs";

interface Props {
	setViewAddModal: Dispatch<SetStateAction<boolean>>;
	tasks: Task[];
	setTasks: SetState<{ [k: string]: Task[] }>;
	name: BoardType;
	setCurrentBoard: SetState<BoardType>;
}

const Board: FC<Props> = ({
	setViewAddModal,
	setCurrentBoard,
	tasks,
	setTasks,
	name,
}) => {
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
				const recentState: { [k: string]: Task[] } = JSON.parse(
					localStorage.getItem("tasks") as string
				);
				let newTasksArray: Task[] = [];
				for (let task of recentState[name]) {
					if (task.id != id) newTasksArray.push(task);
				}
				const newTasks = {
					...recentState,
					[name]: [...newTasksArray],
				};
				localStorage.setItem("tasks", JSON.stringify(newTasks));
				return newTasks;
			});
		};
		return action;
	};

	return (
		<section className="shadow-lg border w-[350px] rounded-md h-80  overflow-auto relative">
			<div className="border-b flex justify-between items-center py-2 px-3 h-12">
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
			<ReactSortable
				onEnd={(e) => {
					console.log(e);
					setTasks((tasks) => {
						const boardList = tasks[name]
							.map((task) => {
								if (task.id == e.item.id) {
									task.oldParent = e.from.id as BoardType;
									task.currentParent = e.to.id as BoardType;
								}
								return task;
							})
							.filter((tasks) => tasks.currentParent == name);
						const newTasks = {
							...tasks,
							[name]: boardList,
						};
						localStorage.setItem("tasks", JSON.stringify(newTasks));
						return newTasks;
					});
				}}
				id={name}
				className="h-[calc(100%-60px)]"
				group={{ name: "taskBoard" }}
				list={tasks}
				setList={(newList) => {
					return setTasks((oldTasks) => {
						if (newList.length > 0) {
							let unique = new Set([...oldTasks[name], ...newList]);
							const newArrayList: Task[] = [];
							unique.forEach((t) => {
								newArrayList.push(t);
							});
							localStorage.setItem(
								"tasks",
								JSON.stringify({
									...oldTasks,
									[name]: newArrayList,
								})
							);
							return {
								...oldTasks,
								[name]: newArrayList,
							};
						}
						return oldTasks;
					});
				}}
			>
				{tasks?.map((task) => (
					<TaskCard
						task={task}
						handleDeleteClick={() => deleteTask(task.id)}
						key={task.id}
						draggable
					/>
				))}
			</ReactSortable>
		</section>
	);
};

export default Board;
