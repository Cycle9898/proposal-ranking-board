import NewPropositionForm from "./NewPropositionForm";

type NewPropositionPageProps = {
	params: { boardId: string };
};

async function NewPropositionPage({ params }: NewPropositionPageProps) {
	const boardId = parseInt(params.boardId);

	return (
		<main className="flex flex-col gap-4 mt-4 px-16">
			<h3 className="text-2xl font-bold">Create a new proposition</h3>

			<NewPropositionForm boardId={boardId} />
		</main>
	);
}

export default NewPropositionPage;
