import { classed } from "@tw-classed/react";

export const PaginationButton = classed(
	"button",
	"text-white bg-sky-700 enabled:hover:bg-sky-800 disabled:opacity-65 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-sky-600 dark:enabled:hover:bg-sky-700 focus:outline-none dark:focus:ring-sky-800"
);
