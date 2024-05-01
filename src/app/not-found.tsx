import { Button } from "@/components/features/form/Button";

export default function NotFound() {
	return (
		<main className="flex-1 flex flex-col items-center gap-10 my-10 px-16">
			<h2 className="text-3xl">Not Found !</h2>

			<p>Could not find requested resource</p>

			<Button as="a" href="/" className="">
				Return on Homepage
			</Button>
		</main>
	);
}
