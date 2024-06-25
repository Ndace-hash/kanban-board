"use client";
import { useEffect, useState } from "react";

// Components
import Board from "@/components/Board";
import AddModal from "@/components/AddModal";

export default function Home() {
	const [viewAddModal, setViewAddModal] = useState(false);
	const [tasks, setTasks] = useState<
		{ title: string; description: string; id: string }[]
	>([]);
	useEffect(() => {
		setTasks(JSON.parse(localStorage.getItem("tasks") as string) || []);
	}, []);

	return (
		<main className="w-full">
			<div className="min-w-full flex justify-center">
				<h1 className="font-bold  text-3xl">Kanban Board</h1>
			</div>
			<div className=" flex justify-center">
				<Board
					setViewAddModal={setViewAddModal}
					tasks={tasks}
					setTasks={setTasks}
				/>
			</div>
			{viewAddModal ? (
				<AddModal
					onClick={(e) => {
						setViewAddModal(false);
					}}
					setTasks={setTasks}
				/>
			) : (
				""
			)}
		</main>
	);
}
