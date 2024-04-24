"use server";

import { prisma } from "@/db/prisma";
import { getIpAddress } from "@/utils/getIpAddress";

export const handleUpVote = async (propositionId: number) => {
	const clientIpAddress = getIpAddress();

	const searchExistingVote = await prisma.vote.findFirst({
		where: {
			propositionId: propositionId,
			ip: clientIpAddress
		}
	});

	if (searchExistingVote) {
		throw new Error("Already voted");
	}

	await prisma.vote.create({
		data: {
			ip: clientIpAddress,
			propositionId: propositionId
		}
	});
};
