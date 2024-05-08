import { prisma } from "@/db/prisma";
import { Button } from "@/components/features/form/Button";
import Proposition from "@/components/features/proposition/PropositionLine";
import PaginationCommands from "@/components/features/pagination/PaginationCommands";
import SearchForm from "@/components/features/search/SearchForm";
import { Prisma } from "@prisma/client";

type BoardPageProps = {
	params: { boardId: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

async function BoardPage({ params, searchParams }: BoardPageProps) {
	const boardId = parseInt(params.boardId);
	const pageNb = Number(searchParams.page ?? 0);
	const searchTerms = searchParams.search;
	const propositionsPerPage = 3;

	const propositionWhereQuery: Prisma.PropositionWhereInput | undefined = {
		AND: [
			Array.isArray(searchTerms)
				? {
						OR: searchTerms.map(term => ({ title: { contains: term, mode: "insensitive" } }))
				  }
				: searchTerms
				? { title: { contains: searchTerms, mode: "insensitive" } }
				: {},
			{ boardId: boardId }
		]
	};

	const totalPropositionsNumber = await prisma.proposition.count({
		where: propositionWhereQuery
	});
	const propositions = await prisma.proposition.findMany({
		take: propositionsPerPage,
		skip: Math.max(0, pageNb * propositionsPerPage),
		where: propositionWhereQuery,
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

			<SearchForm className="max-w-3xl" label="Search a proposition" baseUrl={`/boards/${boardId}`} />

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
				searchTerms={searchTerms}
			/>
		</div>
	);
}

export default BoardPage;
