"use client";
import { useEffect, useState } from "react";

// Components
import Board from "@/components/Board";
import AddModal from "@/components/AddModal";

// types
import { Boards, Task } from "@/../types";

export default function Home() {
	const [viewAddModal, setViewAddModal] = useState(false);
	const [currentBoard, setCurrentBoard] = useState<Boards>(Boards.BACKLOG);
	useEffect(() => {
		setTasks(JSON.parse(localStorage.getItem("tasks") as string) || []);
	}, []);
	const [tasks, setTasks] = useState<{
		[k: string]: Task[];
	}>({
		[Boards.BACKLOG]: [],
		[Boards.TODO]: [],
		[Boards.IN_PROGRESS]: [],
		[Boards.COMPLETED]: [],
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
					tasks={tasks[Boards.COMPLETED]}
					setTasks={setTasks}
					name={Boards.COMPLETED}
				/>
			</div>
			{viewAddModal ? (
				<AddModal
					onClick={() => {
						setViewAddModal(false);
					}}
					setTasks={setTasks}
					currentBoard={currentBoard}
				/>
			) : (
				""
			)}
		</main>
	);
}
