"use client";

import { Button } from "@/components/features/form/Button";
import { useEffect } from "react";

type ErrorPageProps = {
	error: Error & { digest?: string };
	reset: () => void;
};

function Error({ error, reset }: ErrorPageProps) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<main className="flex-1 flex flex-col items-center gap-10 my-10 px-16">
			<h2 className="text-3xl">Something went wrong!</h2>

			<p>Unexpected error</p>

			<Button onClick={() => reset()}>Try again</Button>
		</main>
	);
}

export default Error;
