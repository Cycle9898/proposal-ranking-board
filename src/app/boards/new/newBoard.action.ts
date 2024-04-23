"use server";

import { z } from "zod";
import { prisma } from "@/db/prisma";

const TitleScheme = z.string().min(1).max(200);

export const submitBoardForm = async (title: string) => {
	const boardTitle = TitleScheme.parse(title);

	await prisma.board.create({
		data: {
			title: boardTitle
		}
	});
};
