import { FC, ReactNode, useEffect, useRef } from "react";
import Sortable from "sortablejs";
type SortableProps = {
	children: ReactNode;
	group: string;
};

const SortableWrapper: FC<SortableProps> = ({ children, group }) => {
	const wrapper = useRef<HTMLElement>(null);
	useEffect(() => {
		new Sortable(wrapper.current!, { group });
	}, []);
	return (
		<section ref={wrapper} className="h-[calc(100%-48px)] py-1 overflow-auto">
			{children}
		</section>
	);
};

export default SortableWrapper;
