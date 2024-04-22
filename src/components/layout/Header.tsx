import Link from "next/link";

function Header() {
	return (
		<header className="text-center py-10 border-b-2">
			<Link href="/" aria-label="Link to homepage">
				<h1 className="font-bold text-6xl">Proposal Ranking Board</h1>
			</Link>
		</header>
	);
}

export default Header;
