import { prisma } from "@/db/prisma";
import { Button } from "@/components/features/form/Button";
import Proposition from "@/components/features/proposition/PropositionLine";

type BoardPageProps = {
	params: { boardId: string };
};

async function BoardPage({ params }: BoardPageProps) {
	const boardId = parseInt(params.boardId);

	const propositions = await prisma.proposition.findMany({
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
		<div className="flex flex-col gap-6">
			<Button as="a" href={`/boards/${boardId}/new-proposition`} className="self-end">
				Suggest a proposition
			</Button>

			<ul className="flex flex-col gap-4">
				{propositions.map(proposition => (
					<li key={proposition.id}>
						<Proposition voteCount={proposition._count.vote} {...proposition} />
					</li>
				))}
			</ul>
		</div>
	);
}

export default BoardPage;
