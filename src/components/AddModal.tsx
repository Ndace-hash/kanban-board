import {
	MouseEventHandler,
	useState,
	FormEvent,
	Dispatch,
	SetStateAction,
} from "react";

interface AddModalProps {
	onClick: MouseEventHandler<HTMLDivElement>;
	setTasks: Dispatch<
		SetStateAction<
			{
				title: string;
				description: string;
			}[]
		>
	>;
	tasks: { title: string; description: string }[];
}
const AddModal = ({ onClick, setTasks, tasks }: AddModalProps) => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
	});
	function handleSubmit(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault();
		setTasks((tasks) => {
			const newTasks = [...tasks, formData];
			localStorage.setItem("tasks", JSON.stringify(newTasks));
			return newTasks;
		});
		setFormData({
			title: "",
			description: "",
		});
	}
	return (
		<div
			className="absolute inset-0 bg-gradient-to-b from-slate-200 to-slate-400 z-50 opacity-75 flex items-center justify-center"
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
					<h1 className="text-white font-semibold text-xl">Add new task</h1>
				</div>
				<div>
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
								setFormData({
									title: e.target.value,
									description: formData.description,
								});
							}}
						/>
					</div>
				</div>
				<div>
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
								setFormData({
									title: formData.title,
									description: e.target.value,
								});
							}}
						/>
					</div>
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
