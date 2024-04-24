"use server";

import { z } from "zod";
import { prisma } from "@/db/prisma";
import { getIpAddress } from "@/utils/getIpAddress";

const TitleScheme = z.string().min(1).max(190);

export const submitPropositionForm = async (proposition: string, boardId: number) => {
	const propositionTitle = TitleScheme.parse(proposition);

	const clientIpAddress = getIpAddress();

	await prisma.proposition.create({
		data: {
			title: propositionTitle,
			boardId: boardId,
			ip: clientIpAddress
		}
	});
};
