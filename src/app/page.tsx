import BoardCard from "@/components/features/board/BoardCard";
import { Button } from "@/components/features/form/Button";
import { prisma } from "@/db/prisma";

async function Home() {
	const boards = await prisma.board.findMany();

	return (
		<main className="flex-1 flex flex-col gap-4 my-5 px-16">
			<h2 className="text-3xl font-bold">Boards list</h2>

			<Button as="a" href="/boards/new" className="self-end">
				Create a board
			</Button>

			<ul className="flex flex-col gap-2">
				{boards.map(board => (
					<BoardCard key={board.id} board={board} />
				))}
			</ul>
		</main>
	);
}

export default Home;
