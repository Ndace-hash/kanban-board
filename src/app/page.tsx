"use client";
import { useEffect, useState } from "react";

// Components
import Board from "@/components/Board";
import AddModal from "@/components/AddModal";

// types
import { BoardNames, Task, BoardType } from "@/../types";

export default function Home() {
	const [viewAddModal, setViewAddModal] = useState(false);
	const [currentBoard, setCurrentBoard] = useState<BoardType>(
		BoardNames.BACKLOG
	);
	useEffect(() => {
		setTasks(JSON.parse(localStorage.getItem("tasks") as string) || []);
	}, []);
	const [tasks, setTasks] = useState<{
		[k: string]: Task[];
	}>({
		[BoardNames.BACKLOG]: [],
		[BoardNames.TODO]: [],
		[BoardNames.IN_PROGRESS]: [],
		[BoardNames.COMPLETED]: [],
	});

	return (
		<main className="w-full min-h-screen flex flex-col">
			<div className="min-w-full flex justify-center">
				<h1 className="font-bold  text-3xl">Kanban Board</h1>
			</div>
			<div className=" flex justify-center items-center my-auto min-h-full flex-wrap">
				<Board
					setViewAddModal={setViewAddModal}
					setCurrentBoard={setCurrentBoard}
					tasks={tasks[BoardNames.BACKLOG]}
					setTasks={setTasks}
					name={BoardNames.BACKLOG}
				/>
				<Board
					setViewAddModal={setViewAddModal}
					setCurrentBoard={setCurrentBoard}
					tasks={tasks[BoardNames.TODO]}
					setTasks={setTasks}
					name={BoardNames.TODO}
				/>
				<Board
					setViewAddModal={setViewAddModal}
					setCurrentBoard={setCurrentBoard}
					tasks={tasks[BoardNames.IN_PROGRESS]}
					setTasks={setTasks}
					name={BoardNames.IN_PROGRESS}
				/>
				<Board
					setViewAddModal={setViewAddModal}
					setCurrentBoard={setCurrentBoard}
					tasks={tasks[BoardNames.COMPLETED]}
					setTasks={setTasks}
					name={BoardNames.COMPLETED}
				/>
			</div>
			{viewAddModal ? (
				<AddModal
					onClick={() => {
						setViewAddModal(false);
					}}
					setTasks={setTasks}
					currentBoard={currentBoard}
					setViewAddModal={setViewAddModal}
				/>
			) : (
				""
			)}
		</main>
	);
}
