import { MouseEventHandler, useState, FormEvent, FC } from "react";

import {
	BoardType,
	PriortyLevel,
	SetState,
	Task,
	TaskPriorityLevel,
} from "@/../types";

interface AddModalProps {
	onClick: MouseEventHandler<HTMLDivElement>;
	setTasks: SetState<{ [k: string]: Task[] }>;
	currentBoard: BoardType;
	setViewAddModal: SetState<boolean>;
}
const AddModal: FC<AddModalProps> = ({
	onClick,
	setTasks,
	currentBoard,
	setViewAddModal,
}) => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		priority: PriortyLevel.NORMAL as TaskPriorityLevel,
	});
	const priorty = Object.keys(PriortyLevel);

	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const generateTaskId = () => {
		const time = Date.now();
		const idLength = 32;
		let id = "";
		for (let i = 0; i < idLength; i++) {
			const randomIndex = Math.floor(
				(Math.random() * time) % characters.length
			);
			id += characters[randomIndex];
		}
		return id;
	};

	function handleSubmit(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault();
		if (formData.description == "" || formData.title == "") return;
		const taskDetails: Task = {
			...formData,
			id: generateTaskId(),
			currentParent: currentBoard,
		};
		setTasks((tasks) => {
			let newTasksArray: Task[] = [];
			for (let task of tasks[currentBoard]) {
				newTasksArray.push(task);
			}

			newTasksArray = [...newTasksArray, taskDetails];
			const newTasks = {
				...tasks,
				[currentBoard]: [...newTasksArray],
			};
			localStorage.setItem("tasks", JSON.stringify(newTasks));
			return newTasks;
		});
		setViewAddModal(false);
		setFormData({
			title: "",
			description: "",
			priority: PriortyLevel.NORMAL,
		});
	}

	return (
		<div
			className="absolute inset-0 bg-gradient-to-b from-slate-200 to-slate-400 z-50 opacity-95 flex items-center justify-center"
			onClick={onClick}
		>
			<form
				onClick={(e) => {
					e.stopPropagation();
				}}
				onSubmit={handleSubmit}
				className="bg-slate-700 p-8 rounded-md shadow-lg"
			>
				<div>
					<h1 className="text-white font-semibold text-xl">
						Add new task to {currentBoard.replaceAll("_", " ")} board
					</h1>
				</div>

				<div className="flex flex-col gap-2 py-2">
					<label htmlFor="title" className="text-xs font-bold text-gray-300">
						Title
					</label>
					<input
						type="text"
						id="title"
						className="rounded-md border-2 bg-transparent outline-none text-lg p-1 focus:border-white"
						placeholder="Describe task..."
						value={formData.title}
						onChange={(e) => {
							setFormData((data) => ({ ...data, title: e.target.value }));
						}}
					/>
				</div>

				<div className="flex flex-col gap-2 py-2">
					<label
						htmlFor="description"
						className="text-xs font-bold text-gray-300"
					>
						Description
					</label>
					<textarea
						id="description"
						className="rounded-md border-2 bg-transparent outline-none text-lg p-1 focus:border-white min-h-32 max-h-32 w-full"
						value={formData.description}
						onChange={(e) => {
							setFormData((data) => ({
								...data,
								description: e.target.value,
							}));
						}}
					/>
				</div>
				<div className="flex flex-col gap-2 py-2">
					<label
						htmlFor="description"
						className="text-xs font-bold text-gray-300"
					>
						Priority
					</label>
					<select
						value={formData.priority}
						onChange={(e) => {
							setFormData({
								...formData,
								priority: Number(e.target.value) as TaskPriorityLevel,
							});
						}}
					>
						<option value={PriortyLevel.URGENT}>
							{priorty[PriortyLevel.URGENT]}
						</option>
						<option value={PriortyLevel.HIGH}>
							{priorty[PriortyLevel.HIGH]}
						</option>
						<option value={PriortyLevel.NORMAL}>
							{priorty[PriortyLevel.NORMAL]}
						</option>
						<option value={PriortyLevel.LOW}>
							{priorty[PriortyLevel.LOW]}
						</option>
					</select>
				</div>
				<button
					type="submit"
					className="bg-blue-500 py-1 px-6 rounded-md shadow-sm text-gray-800 font-bold mt-6"
				>
					Add
				</button>
			</form>
		</div>
	);
};

export default AddModal;
