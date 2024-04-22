import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";
import { prisma } from "@/db/prisma";

type BoardLayoutProps = PropsWithChildren<{
	params: { boardId: string };
}>;

async function BoardLayout({ params, children }: BoardLayoutProps) {
	const boardId = parseInt(params.boardId);

	if (isNaN(boardId)) {
		return notFound();
	}

	const board = await prisma.board.findUniqueOrThrow({
		where: {
			id: boardId
		}
	});

	return (
		<main className="flex flex-col gap-4 mt-4 px-16">
			<h2 className="text-3xl font-bold">{board.title}</h2>

			{children}
		</main>
	);
}

export default BoardLayout;
