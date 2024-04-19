import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Providers } from "./providers";

const roboto = Roboto({
	weight: ["400", "500", "700"],
	subsets: ["latin"]
});

export const metadata: Metadata = {
	title: "Proposal Ranking Boards App",
	description: "Make proposals on a board and let people rank it"
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={roboto.className}>
				<Providers />

				<Header />

				{children}
			</body>
		</html>
	);
}
