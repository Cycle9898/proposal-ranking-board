import NewBoardForm from "./NewBoardForm";

function NewBoardPage() {
	return (
		<main className="flex flex-col gap-4 mt-4 px-16">
			<h2 className="text-3xl font-bold">Create a new board</h2>

			<NewBoardForm />
		</main>
	);
}

export default NewBoardPage;
