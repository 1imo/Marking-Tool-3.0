import { FC, useState } from "react";
import MenuLeft from "../../Organisms/Menu-Left/Index";
import MenuRight from "../../Organisms/Menu-Right/Index";
import "./Styles.css";
import NavBar from "../../Organisms/Nav-Bar/Index";
import InputGrid from "../../Organisms/Input-Grid/Index";
import { Props } from "../../Molecules/Input/Index";

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

	return (
		<main className="home">
			<MenuLeft />
			<InputGrid type="double" data={data} remove={true} cb={setData} />
			<MenuRight />
		</main>
	);
};

export default Home;
