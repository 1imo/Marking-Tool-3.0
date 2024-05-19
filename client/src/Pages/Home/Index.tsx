import { FC, useState } from "react";
import MenuLeft from "../../Organisms/Menu-Left/Index";
import MenuRight from "../../Organisms/Menu-Right/Index";
import "./Styles.css";
import NavBar from "../../Organisms/Nav-Bar/Index";
import InputGrid from "../../Organisms/Input-Grid/Index";
import { Props } from "../../Molecules/Input/Index";
import UIMain from "../../Organisms/UI-Main/Index";

const Home: FC = () => {
	const inputFields = [
		{ name: "A", lb: 80 },
		{ name: "B", lb: 60 },
		{ name: "C", lb: 40 },
		{ name: "D", lb: 20 },
	];

	// const inputFields = [
	// 	{ name: "A" },
	// 	{ name: "B" },
	// 	{ name: "C" },
	// 	{ name: "D" },
	// ];

	const [data, setData] = useState(inputFields);

	const [UI, setUI] = useState();

	return (
		<main className="home">
			<MenuLeft />
			<UIMain />
			<MenuRight />
		</main>
	);
};

export default Home;
