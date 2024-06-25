"use client";
import {
	Dispatch,
	Fragment,
	MouseEventHandler,
	SetStateAction,
	useState,
} from "react";
import "./Board.modules.css";

import TaskCard from "./TaskCard";
import AddIcon from "@/components/Icons/MaterialSymbolsAddRounded";
interface props {
	setViewAddModal: Dispatch<SetStateAction<boolean>>;
	tasks: { title: string; description: string; id: string }[] | [];
	setTasks: Dispatch<
		SetStateAction<
			{
				title: string;
				description: string;
				id: string;
			}[]
		>
	>;
}

export default function Board({ setViewAddModal, tasks, setTasks }: props) {
	const handleAddClick: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
		setViewAddModal(true);
	};
	const deleteTask = (id: string) => {
		const action: MouseEventHandler<HTMLButtonElement> = (event) => {
			event.stopPropagation();
			setTasks((tasks) => {
				const newTasks = tasks?.filter((tasks) => tasks.id != id);
				localStorage.setItem("tasks", JSON.stringify(newTasks));
				return newTasks;
			});
		};
		return action;
	};

	return (
		<section className="shadow-lg border w-[350px] rounded-md h-80 max-h-96 overflow-auto">
			<div className="border-b flex justify-between items-center py-2 px-3">
				<h2 className="">In Progress</h2>
				<button
					className="text-xs border p-1 rounded-full shadow-md flex justify-center items-center"
					onClick={handleAddClick}
				>
					<AddIcon className="text-xl" />
					<span className="sr-only">add tasks</span>
				</button>
			</div>
			<div className="py-3">
				{tasks?.map((task) => (
					<Fragment key={task.id}>
						<TaskCard
							task={task}
							handleDeleteClick={() => deleteTask(task.id)}
						/>
					</Fragment>
				))}
			</div>
		</section>
	);
}
