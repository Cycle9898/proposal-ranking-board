import BoardCard from "@/components/features/board/BoardCard";
import { Button } from "@/components/features/form/Button";
import PaginationCommands from "@/components/features/pagination/PaginationCommands";
import SearchForm from "@/components/features/search/SearchForm";
import { prisma } from "@/db/prisma";
import { Prisma } from "@prisma/client";

type HomePageProps = {
	searchParams: { [key: string]: string | string[] | undefined };
};

async function HomePage({ searchParams }: HomePageProps) {
	const pageNb = Number(searchParams.page ?? 0);
	const searchTerm = searchParams.search;
	const boardPerPage = 5;

	const boardWhereQuery: Prisma.BoardWhereInput | undefined = Array.isArray(searchTerm)
		? {
				OR: searchTerm.map(term => ({ title: { contains: term, mode: "insensitive" } }))
		  }
		: searchTerm
		? { title: { contains: searchTerm, mode: "insensitive" } }
		: undefined;

	const totalBoardsNumber = await prisma.board.count({
		where: boardWhereQuery
	});
	const boards = await prisma.board.findMany({
		take: boardPerPage,
		skip: Math.max(0, pageNb * boardPerPage),
		where: boardWhereQuery
	});

	return (
		<main className="flex-1 flex flex-col gap-4 my-5 px-16">
			<h2 className="text-3xl font-bold">Boards list</h2>

			<Button as="a" href="/boards/new" className="self-end">
				Create a board
			</Button>

			<SearchForm className="max-w-3xl" label="Search a board" />

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
