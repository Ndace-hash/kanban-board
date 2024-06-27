import DeleteIcon from "@/components/Icons/MaterialSymbolsDeleteOutline";
import ArrowIcon from "@/components/Icons/BxChevronDown";
import { FC, MouseEventHandler, useState } from "react";
interface CardProps {
	task: {
		title: string;
		description: string;
		id: string;
	};
	handleDeleteClick: (id: string) => MouseEventHandler<HTMLButtonElement>;
	draggable: boolean;
}

const TaskCard: FC<CardProps> = ({ task, handleDeleteClick, draggable }) => {
	const [accordionIsOpen, setAccordionIsOpen] = useState(false);

	return (
		<article
			className="border my-3 mx-2 rounded-md bg-green-300 h-max relative hover:cursor-grab"
			draggable={draggable}
		>
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

export default TaskCard;
