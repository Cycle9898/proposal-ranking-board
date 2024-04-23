import { headers } from "next/headers";

export const getIpAddress = () => {
	const fallbackIpAddress = "127.0.0.1";
	const forwardedFor = headers().get("x-forwarded-for");

	if (forwardedFor) {
		return forwardedFor.split(",")[0] ?? fallbackIpAddress;
	}

	return headers().get("x-real-ip") ?? fallbackIpAddress;
};
