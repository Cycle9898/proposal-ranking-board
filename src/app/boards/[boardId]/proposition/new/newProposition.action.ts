"use server";

import { z } from "zod";
import { prisma } from "@/db/prisma";

const TitleScheme = z.string().min(1).max(200);

export const submitPropositionForm = async (proposition: string, boardId: number) => {
	const propositionTitle = TitleScheme.parse(proposition);

	// Get client IP address
	const clientIpAddress = fetch("https://api.ipify.org?format=json")
		.then(response => response.json())
		.then(data => data.ip)
		.catch(error => {
			throw new Error(error);
		});

	await prisma.proposition.create({
		data: {
			title: propositionTitle,
			boardId: boardId,
			ip: String(clientIpAddress)
		}
	});
};
