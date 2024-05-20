import { FC, useEffect, useState } from "react";
import LabelSelectGrid from "../Label-Select-Grid/Index";
import Heading from "../../Atoms/Headings";
import { Test } from "../../Services/Test";
import { Mode } from "../../Services/Interfaces";

const MenuLeft: FC = () => {
	const options = Object.values(Mode);
	const config = { questions: 12, marks: 100 };
	const boundaries = { a: "80%", b: "60%", c: "40%", d: "20%" };
	const [mode, setMode] = useState<Mode>(options[0] as Mode);

	useEffect(() => {
		Test.setMode(mode);
	}, [mode]);

	const handleModeChange = (selected: string | Mode) => {
		if (typeof selected === "string" && Object.values(Mode).includes(selected as Mode)) {
			setMode(selected as Mode);
		} else if (typeof selected !== "string") {
			setMode(selected);
		}
	};

	return (
		<section className="menu--left">
			<Heading type="Primary" size="three" text="Mode" />
			<LabelSelectGrid options={options} selected={mode} callback={handleModeChange} />

			<Heading type="Primary" size="three" text="Test Configuration" />
			<LabelSelectGrid
				options={Object.entries(config).map(
					([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`
				)}
			/>

			<Heading type="Primary" size="three" text="Grade Boundaries" />
			<LabelSelectGrid
				options={Object.entries(boundaries).map(
					([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`
				)}
			/>
		</section>
	);
};

export default MenuLeft;
