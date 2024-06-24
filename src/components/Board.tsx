"use client";
import { Dispatch, MouseEventHandler, SetStateAction } from "react";
interface props {
	setViewAddModal: Dispatch<SetStateAction<boolean>>;
}
export default function Board({ setViewAddModal }: props) {
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
				<article>Build the next microsoft</article>
			</div>
		</section>
	);
}
