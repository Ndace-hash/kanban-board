import { FC, ReactNode, useEffect, useRef, useState } from "react";
import Sortable from "sortablejs";
import { BoardType, SetState, Task } from "../../types";
type SortableProps = {
	children: ReactNode;
	group: string;
	board: BoardType;
};

const SortableWrapper: FC<SortableProps> = ({ children, group, board }) => {
	const wrapper = useRef<HTMLElement>(null);
	const listRef = useRef({
		oldListId: "",
		newListId: "",
	});
	useEffect(() => {
		new Sortable(wrapper.current!, {
			group,
			onStart(event) {
				const { item } = event;
				const parent = item.parentElement;
				if (parent) listRef.current.oldListId = parent.id;
			},
			onEnd(event) {
				const { item } = event;
				const parent = item.parentElement;
				if (parent) listRef.current.newListId = parent.id;
				let tasks: {
					[k: string]: Task[];
				};

				tasks = JSON.parse(localStorage.getItem("tasks")!);
				const oldBoardList = tasks[listRef.current.oldListId].filter(
					(task) => task.id != item.id
				);

				let newBoardList = tasks[listRef.current.newListId];
				for (let task of tasks[listRef.current.oldListId]) {
					if (task.id == item.id) newBoardList.push(task);
				}
				const newTasks = {
					...tasks,
					[listRef.current.oldListId]: oldBoardList,
					[listRef.current.newListId]: newBoardList,
				};
				console.log(newTasks);
				localStorage.setItem("tasks", JSON.stringify(newTasks));
			},
		});
	}, []);
	return (
		<section
			ref={wrapper}
			className="h-[calc(100%-48px)] py-1 overflow-auto"
			id={board}
		>
			{children}
		</section>
	);
};

export default SortableWrapper;
