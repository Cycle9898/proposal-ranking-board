import { Board } from "@prisma/client";
import Link from "next/link";

type BoardCardProps = {
	board: Board;
};

function BoardCard({ board }: BoardCardProps) {
	return (
		<Link
			href={`/boards/${board.id}`}
			className="block w-fit p-6 rounded-lg bg-gray-300 shadow dark:bg-gray-800 border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700">
			<h3 className="text-2xl font-bold tracking-tight dark:text-white">{board.title}</h3>
		</Link>
	);
}

export default BoardCard;
