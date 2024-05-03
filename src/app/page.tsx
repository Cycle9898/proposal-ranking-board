import BoardCard from "@/components/features/board/BoardCard";
import { Button } from "@/components/features/form/Button";
import PaginationCommands from "@/components/features/pagination/PaginationCommands";
import { prisma } from "@/db/prisma";

type HomePageProps = {
	searchParams: { [key: string]: string | string[] | undefined };
};

async function HomePage({ searchParams }: HomePageProps) {
	const pageNb = Number(searchParams.page ?? 0);
	const boardPerPage = 6;

	const totalBoardsNumber = await prisma.board.count();
	const boards = await prisma.board.findMany({
		take: boardPerPage,
		skip: Math.max(0, pageNb * boardPerPage)
	});

	return (
		<main className="flex-1 flex flex-col gap-4 my-5 px-16">
			<h2 className="text-3xl font-bold">Boards list</h2>

			<Button as="a" href="/boards/new" className="self-end">
				Create a board
			</Button>

			<ul className="flex-1 flex flex-col gap-2">
				{boards.map(board => (
					<li key={board.id}>
						<BoardCard board={board} />
					</li>
				))}
			</ul>

			<PaginationCommands
				className="self-center"
				totalPage={Math.ceil(totalBoardsNumber / boardPerPage)}
				pageNb={pageNb}
			/>
		</main>
	);
}

export default HomePage;
