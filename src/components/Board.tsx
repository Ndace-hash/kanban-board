"use client";
import {
	Dispatch,
	Fragment,
	MouseEventHandler,
	SetStateAction,
	useState,
} from "react";
import "./Board.modules.css";

import DeleteIcon from "@/components/Icons/MaterialSymbolsDeleteOutline";
import ArrowIcon from "@/components/Icons/BxChevronDown";
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
interface cardProp {
	task: {
		title: string;
		description: string;
		id: string;
	};
	handleDeleteClick: (id: string) => MouseEventHandler<HTMLButtonElement>;
}
const TaskCard = ({ task, handleDeleteClick }: cardProp) => {
	const [accordionIsOpen, setAccordionIsOpen] = useState(false);
	return (
		<article className="border my-3 mx-2 rounded-md bg-green-300 h-max relative">
			<div className="flex justify-between items-center p-1 relative">
				<h3 className="font-semibold">{task.title}</h3>
				<div className="actions flex z-10 items-center absolute right-0 px-3 bg-gradient-to-r from-green-300 to-green-400 h-full rounded-e-sm">
					<button onClick={() => setAccordionIsOpen(!accordionIsOpen)}>
						<ArrowIcon
							className={`duration-200 ${accordionIsOpen ? "rotate-180" : ""}`}
						/>
						<span className="sr-only">toggle accordion</span>
					</button>
					<button onClick={handleDeleteClick(task.id)}>
						<DeleteIcon />
						<span className="sr-only">delete</span>
					</button>
				</div>
			</div>
			<p
				className={`duration-700 rounded-sm shadow-inner bg-green-400 py-1 px-2 text-sm w-full ${
					accordionIsOpen
						? "translate-y-0"
						: "absolute -translate-y-3/4 opacity-0"
				}`}
			>
				{task.description}
			</p>
		</article>
	);
};

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
		<section className="shadow-lg border w-[350px] rounded-md">
			<div className="border-b flex justify-between py-2 px-2">
				<h2 className="">In Progress</h2>
				<button
					className="text-xs border p-1 rounded-md shadow-sm"
					onClick={handleAddClick}
				>
					add
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
