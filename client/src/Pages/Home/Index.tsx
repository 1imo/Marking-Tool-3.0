import { FC, useEffect, useState } from "react";
import MenuLeft from "../../Organisms/Menu-Left/Index";
import MenuRight from "../../Organisms/Menu-Right/Index";
import "./Styles.css";
import NavBar from "../../Organisms/Nav-Bar/Index";
import InputGrid from "../../Organisms/Input-Grid/Index";
import { Props } from "../../Molecules/Input/Index";
import UIMain from "../../Organisms/UI-Main/Index";
import { Actions } from "../../Services/Interfaces";
import { Class } from "../../Services/Class";
import { Test } from "../../Services/Test";

const content = {
	"Create Class": (
		<InputGrid
			type="single"
			data={[{ name: "Class Name" }]}
			remove={false}
			cb={(arg: string) => Class.addClass(arg)}
		/>
	),
	"Edit Class": (
		<InputGrid
			type="single"
			data={[{ name: Class.getCurrentClass()?.name }]}
			remove={true}
			cb={(arg: string) => Class.editClass(Class.getCurrentClass()?.name || "", arg)}
			removeCb={(arg: string) => Class.deleteClass(arg)}
		/>
	),
	"Create Test": (
		<InputGrid
			type="single"
			data={[{ name: "Test Name" }]}
			remove={false}
			cb={(arg: string) => Test.addTest(arg)}
		/>
	),
	"Edit Test": (
		<InputGrid
			type="single"
			data={[{ name: Test.getAllTests().then((tests) => tests.map((test) => test?.name)) }]}
			remove={true}
			cb={(arg: string) => Class.editClass(Class.getCurrentClass()?.name || "", arg)}
			removeCb={(arg: string) => Class.deleteClass(arg)}
		/>
	),
	Home: <UIMain />,
};

const Home: FC = () => {
	const inputFields = [
		{ name: "A", lb: 80 },
		{ name: "B", lb: 60 },
		{ name: "C", lb: 40 },
		{ name: "D", lb: 20 },
	];

	const [data, setData] = useState(inputFields);
	const [UI, setUI] = useState(content["Home"]);

	// export enum Actions {
	// 	CreateClass = "Create Class",
	// 	DeleteClass = "Delete Class",
	// 	EditTestConfig = "Edit Test Config",
	// 	CreateTest = "Create Test",
	// 	DeleteTest = "Delete Test",
	// 	EditGradeBounds = "Edit Grade Bounds",
	// 	DeleteGradeBounds = "Delete Grade Bounds",
	// 	Home = "Home",
	// }

	const actions = Object.values(Actions);

	useEffect(() => {
		console.log(UI);
	}, [UI]);

	return (
		<main className="home">
			<MenuLeft />
			{UI}
			<MenuRight
				cb={[
					() => setUI(content["Create Test"]),
					() => setUI(content["Edit Test"]),
					() => setUI(content["Create Class"]),
					() => setUI(content["Edit Class"]),
				]}
			/>
		</main>
	);
};

export default Home;
