"use client";
import { Dispatch, Fragment, MouseEventHandler, SetStateAction } from "react";
interface props {
	setViewAddModal: Dispatch<SetStateAction<boolean>>;
	tasks?: { title: string; description: string; id: string }[] | [];
}
interface cardProp {
	task: {
		title: string;
		description: string;
		id: string;
	};
}
const TaskCard = ({ task }: cardProp) => {
	return (
		<article className="border my-3 mx-2 rounded-md bg-green-300">
			<div className="flex justify-between items-center p-1">
				<h3 className="font-semibold">{task.title}</h3>
				<div>
					<button>delete</button>
				</div>
			</div>
			<p className="shadow-inner bg-green-400 py-1 px-2 text-sm">
				{task.description}
			</p>
		</article>
	);
};

export default function Board({ setViewAddModal, tasks }: props) {
	const handleAddClick: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
		setViewAddModal(true);
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
						<TaskCard task={task} />
					</Fragment>
				))}
			</div>
		</section>
	);
}
