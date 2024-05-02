"use client";

import { useRouter } from "next/navigation";
import { PaginationButton } from "./PaginationButton";

type PaginationButtonProps = {
	totalPage: number;
	pageNb: number;
	baseUrl?: string;
	className?: string;
};

function PaginationCommands({ totalPage, pageNb, baseUrl, className }: PaginationButtonProps) {
	const router = useRouter();

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

		let url;
		if (baseUrl) {
			url = `${baseUrl}?${searchParams.toString()}`;
		} else {
			url = `/?${searchParams.toString()}`;
		}

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
