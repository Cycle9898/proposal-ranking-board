"use client";

import { Button } from "@/components/features/form/Button";
import { Input } from "@/components/features/form/Input";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import toast from "react-hot-toast";
import { submitPropositionForm } from "./formAction";

function NewPropositionForm() {
	const router = useRouter();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		const proposition = String(formData.get("proposition"));

		if (location) {
			const boardId = parseInt(location.pathname.split("/")[2]);

			submitPropositionForm(proposition, boardId)
				.then(() => router.push(`/boards/${boardId}`))
				.catch(error =>
					toast.error("Error, could not save this proposition.\n Please try again later.", { duration: 6000 })
				);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col max-w-3xl gap-4">
			<Input label="Proposition title" name="proposition" />

			<Button type="submit" className="self-center">
				Validate proposition
			</Button>
		</form>
	);
}

export default NewPropositionForm;
