"use client";

import { FormEvent } from "react";
import { Input } from "../form/Input";
import { useRouter } from "next/navigation";
import { Button } from "../form/Button";
import { FaSearch } from "react-icons/fa";

type SearchFormPRops = {
	label: string;
	className?: string;
	baseUrl?: string;
};

function SearchForm({ label, className, baseUrl }: SearchFormPRops) {
	const router = useRouter();

	if (!baseUrl) baseUrl = "/";

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const searchTextInput = String(formData.get("search")).split(" ");

		const searchParams = searchTextInput.map(searchText =>
			searchText.length > 1 ? new URLSearchParams({ search: searchText }) : ""
		);

		const url = `${baseUrl}?${searchParams.join("&")}`;

		router.push(url);
	};

	return (
		<form className={(className || "") + " flex items-center w-full"} onSubmit={handleSubmit}>
			<Input
				className="border text-sm rounded-l-lg block w-full p-2.5 bg-gray-200 dark:bg-gray-700 border-gray-600 placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500"
				label={label}
				name="search"
			/>

			<Button type="submit" className="py-3.5 text-sm mt-3 rounded-r-lg rounded-l-none">
				<FaSearch aria-label="search" title="search" />
			</Button>
		</form>
	);
}

export default SearchForm;
