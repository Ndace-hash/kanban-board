"use client";
import { FC, MouseEventHandler } from "react";
import "./Board.modules.css";

import TaskCard from "./TaskCard";
import AddIcon from "@/components/Icons/MaterialSymbolsAddRounded";
import { Task, BoardType, BoardProps } from "@/../types";
import {
	ReactSortable,
	Sortable,
	SortableEvent,
	Store,
} from "react-sortablejs";

const Board: FC<BoardProps> = ({
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

	const handleDragEnd = (
		evt: SortableEvent,
		_sortable: Sortable | null,
		_store: Store
	) => {
		setTasks((tasks) => {
			const boardList = tasks[name]
				.map((task) => {
					if (task.id == evt.item.id) {
						task.oldParent = evt.from.id as BoardType;
						task.currentParent = evt.to.id as BoardType;
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
	};

	const handleSetList = (
		newState: Task[],
		_sortable: Sortable | null,
		_store: Store
	) => {
		return setTasks((oldTasks) => {
			if (newState.length > 0) {
				let unique = new Set([...oldTasks[name], ...newState]);
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
				onEnd={handleDragEnd}
				id={name}
				className="h-[calc(100%-60px)]"
				group={{ name: "taskBoard" }}
				list={tasks}
				setList={handleSetList}
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
