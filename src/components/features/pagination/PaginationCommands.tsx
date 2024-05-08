"use client";

import { useRouter } from "next/navigation";
import { PaginationButton } from "./PaginationButton";

type PaginationButtonProps = {
	totalPage: number;
	pageNb: number;
	baseUrl?: string;
	className?: string;
	searchTerms?: string | string[] | undefined;
};

function PaginationCommands({ totalPage, pageNb, baseUrl = "/", className, searchTerms }: PaginationButtonProps) {
	const router = useRouter();

	const addSearchQueries = (searchTerms: string | string[] | undefined) => {
		let chainedSearchQueries = "";

		if (Array.isArray(searchTerms)) {
			searchTerms.forEach(term => (chainedSearchQueries += `&search=${term}`));
		} else if (searchTerms) {
			chainedSearchQueries += `&search=${searchTerms}`;
		}

		return chainedSearchQueries;
	};

	const handlePageChange = (direction: "next" | "previous") => {
		let searchParams;
		if (direction == "previous") {
			searchParams = new URLSearchParams({
				page: String(pageNb - 1)
			});
		} else {
			searchParams = new URLSearchParams({
				page: String(pageNb + 1)
			});
		}

		const url = `${baseUrl}?${searchParams.toString()}${addSearchQueries(searchTerms)}`;

		router.push(url);
	};

	return (
		<div className={(className || "") + " flex gap-10"}>
			<PaginationButton onClick={() => handlePageChange("previous")} disabled={pageNb <= 0}>
				Previous
			</PaginationButton>

			<PaginationButton onClick={() => handlePageChange("next")} disabled={pageNb > totalPage - 2}>
				Next
			</PaginationButton>
		</div>
	);
}

export default PaginationCommands;
