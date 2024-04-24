"use client";

import { Button } from "@/components/features/form/Button";
import { Input } from "@/components/features/form/Input";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import toast from "react-hot-toast";
import { submitPropositionForm } from "./newProposition.action";
import { CancelButton } from "@/components/features/form/CancelButton";

type NewPropositionFormProps = {
	boardId: number;
};

function NewPropositionForm({ boardId }: NewPropositionFormProps) {
	const router = useRouter();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const proposition = String(formData.get("proposition"));

		submitPropositionForm(proposition, boardId)
			.then(() => router.push(`/boards/${boardId}`))
			.catch(error =>
				toast.error("Error, could not save this proposition.\n Please try again later.", { duration: 6000 })
			);
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col max-w-3xl gap-4">
			<Input label="Proposition title" name="proposition" />

			<div className="self-center flex items-center gap-4">
				<Button type="submit">Validate proposition</Button>

				<CancelButton type="button" onClick={() => router.push(`/boards/${boardId}`)}>
					Cancel
				</CancelButton>
			</div>
		</form>
	);
}

export default NewPropositionForm;
