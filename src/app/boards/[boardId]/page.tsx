import { prisma } from "@/db/prisma";
import { Button } from "@/components/features/form/Button";
import Proposition from "@/components/features/proposition/PropositionLine";
import PaginationCommands from "@/components/features/pagination/PaginationCommands";

type BoardPageProps = {
	params: { boardId: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

async function BoardPage({ params, searchParams }: BoardPageProps) {
	const boardId = parseInt(params.boardId);
	const pageNb = Number(searchParams.page ?? 0);
	const propositionsPerPage = 4;

	const totalPropositionsNumber = await prisma.proposition.count({
		where: {
			boardId: boardId
		}
	});
	const propositions = await prisma.proposition.findMany({
		take: propositionsPerPage,
		skip: Math.max(0, pageNb * propositionsPerPage),
		where: {
			boardId: boardId
		},
		orderBy: {
			vote: {
				_count: "desc"
			}
		},
		select: {
			title: true,
			id: true,
			_count: {
				select: {
					vote: true
				}
			}
		}
	});

	return (
		<div className="flex-1 flex flex-col gap-6">
			<Button as="a" href={`/boards/${boardId}/new-proposition`} className="self-end">
				Suggest a proposition
			</Button>

			<ul className="flex-1 flex flex-col gap-4">
				{propositions.map(proposition => (
					<li key={proposition.id}>
						<Proposition voteCount={proposition._count.vote} {...proposition} />
					</li>
				))}
			</ul>

			<PaginationCommands
				className="self-center"
				totalPage={Math.ceil(totalPropositionsNumber / propositionsPerPage)}
				pageNb={pageNb}
				baseUrl={`/boards/${boardId}`}
			/>
		</div>
	);
}

export default BoardPage;
