import NewBoardForm from "./NewBoardForm";

function NewBoardPage() {
	return (
		<main className="flex-1 flex flex-col gap-4 my-5 px-16">
			<h2 className="text-3xl font-bold">Create a new board</h2>

			<NewBoardForm />
		</main>
	);
}

export default NewBoardPage;
