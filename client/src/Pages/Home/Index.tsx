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

const content = {
	"Create Class": () => (
		<InputGrid
			type="single"
			data={[{ name: "Class Name" }]}
			remove={false}
			cb={(arg: string) => Class.addClass(arg)}
		/>
	),
	"Edit Class": () => (
		<InputGrid
			type="single"
			data={[{ name: Class.getCurrentClass()?.name || "" }]}
			remove={true}
			cb={(arg: string) => Class.editClass(Class.getCurrentClass()?.name || "", arg)}
			removeCb={(arg: string) => Class.deleteClass(arg)}
		/>
	),
	"Create Test": () => (
		<InputGrid
			type="single"
			data={[{ name: "Test Name" }]}
			remove={false}
			cb={(arg: string) => Test.addTest(arg)}
		/>
	),
	"Edit Test": async () => {
		const tests = await Test.getAllTests();
		const testNames = tests.map((test) => ({ name: test?.name || "" }));
		return (
			<InputGrid
				type="single"
				data={testNames}
				remove={true}
				cb={(arg: string) => Test.editTest(Test.getCurrentTest()?.name || "", arg)}
				removeCb={(arg: string) => Test.deleteTest(arg)}
			/>
		);
	},
	Home: () => <UIMain />,
};

const Home: FC = () => {
	const inputFields = [
		{ name: "A", lb: 80 },
		{ name: "B", lb: 60 },
		{ name: "C", lb: 40 },
		{ name: "D", lb: 20 },
	];

	const [data, setData] = useState(inputFields);
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

	useEffect(() => {
		console.log(UI);
	}, [UI]);

	return (
		<main className="home">
			<MenuLeft />
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
