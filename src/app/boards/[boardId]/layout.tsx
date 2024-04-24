import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";
import { prisma } from "@/db/prisma";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

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
			<div className="flex items-center gap-8">
				<Link href="/" title="Back to homepage" aria-label="Back to homepage">
					<FaArrowLeftLong className="text-3xl" />
				</Link>

				<h2 className="text-3xl font-bold">{board.title}</h2>
			</div>

			{children}
		</main>
	);
}

export default BoardLayout;
