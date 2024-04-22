import NewPropositionForm from "./NewPropositionForm";

async function NewPropositionPage() {
	return (
		<main className="flex flex-col gap-4 mt-4 px-16">
			<h3 className="text-2xl font-bold">Create a new proposition</h3>

			<NewPropositionForm />
		</main>
	);
}

export default NewPropositionPage;
