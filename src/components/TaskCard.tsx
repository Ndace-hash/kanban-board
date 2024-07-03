import DeleteIcon from "@/components/Icons/MaterialSymbolsDeleteOutline";
import ArrowIcon from "@/components/Icons/BxChevronDown";
import { FC, MouseEventHandler, useState } from "react";
import { BoardNames, Task } from "../../types";
interface CardProps {
	task: Task;
	handleDeleteClick: (id: string) => MouseEventHandler<HTMLButtonElement>;
	draggable: boolean;
}
const priorityGroup = [
	{ mainColor: "bg-red-400", secondaryColor: "bg-red-500" },
	{ mainColor: "bg-orange-300", secondaryColor: "bg-orange-400" },
	{ mainColor: "bg-yellow-300", secondaryColor: "bg-yellow-400" },
	{ mainColor: "bg-green-300", secondaryColor: "bg-green-400" },
];

const TaskCard: FC<CardProps> = ({ task, handleDeleteClick, draggable }) => {
	const [accordionIsOpen, setAccordionIsOpen] = useState(false);

	return (
		<article
			className={`border my-3 mx-2 rounded-md h-max relative hover:cursor-grab ${
				priorityGroup[task.priority!].mainColor
			}`}
			draggable={draggable}
			id={task.id}
		>
			<div className="flex justify-between items-center p-1 relative">
				<h3
					className={`font-semibold  ${
						task.currentParent == BoardNames.COMPLETED ? "line-through" : ""
					}`}
				>
					{task.title}
				</h3>
				<div
					className={`actions flex z-10 items-center absolute right-0 px-3 bg-gradient-to-r from-transparent to-${
						priorityGroup[task.priority!].mainColor
					} h-full rounded-e-sm`}
				>
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
				className={`duration-700 rounded-sm shadow-inner ${
					priorityGroup[task.priority!].secondaryColor
				} py-1 px-2 text-sm w-full ${
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

export default TaskCard;
