import { FC, useEffect, useState } from "react";
import MenuLeft from "../../Organisms/Menu-Left/Index";
import MenuRight from "../../Organisms/Menu-Right/Index";
import "./Styles.css";
import NavBar from "../../Organisms/Nav-Bar/Index";
import InputGrid from "../../Organisms/Input-Grid/Index";
import UIMain from "../../Organisms/UI-Main/Index";
import { Actions } from "../../Services/Interfaces";
import { Class } from "../../Services/Class";
import { Test } from "../../Services/Test";
import { content } from "./Service";

const Home: FC = () => {
	const [UI, setUI] = useState<JSX.Element>(<UIMain />);

	const handleSetUI = async (action: keyof typeof content) => {
		const actionFunction = content[action];

		if (typeof actionFunction === "function") {
			try {
				const result = await actionFunction();
				setUI(() => result as JSX.Element);
			} catch (error) {
				console.error("Error in handleSetUI:", error);
			}
		} else {
			setUI(() => actionFunction as JSX.Element);
		}
	};

	return (
		<main className="home">
			<MenuLeft
				cb={[
					() => handleSetUI("Edit Test Config"),
					() => handleSetUI("Edit Grade Boundaries"),
				]}
			/>
			{UI}
			<MenuRight
				cb={[
					() => handleSetUI("Create Test"),
					() => handleSetUI("Edit Test"),
					() => handleSetUI("Create Class"),
					() => handleSetUI("Edit Class"),
					() => handleSetUI("Home"),
				]}
			/>
		</main>
	);
};

export default Home;
