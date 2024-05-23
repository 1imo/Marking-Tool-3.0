import { FC, useEffect, useState } from "react";
import LabelSelectGrid from "../Label-Select-Grid/Index";
import Heading from "../../Atoms/Headings";
import { Test } from "../../Services/Test";
import { Mode } from "../../Services/Interfaces";
import { Emitter } from "../../Services/emitter.config";

interface Props {
	cb: (() => void)[];
}

const MenuLeft: FC<Props> = ({ cb }) => {
	const options = Object.values(Mode);
	const [config, setConfig] = useState({});
	const [boundaries, setBoundaries] = useState({});
	const [mode, setMode] = useState<Mode>(options[0] as Mode);

	async function callData() {
		const currentTest = Test.getCurrentTest();
		const c = {
			questions: currentTest?.questions,
			marks: currentTest?.marks,
		};

		const gb = await Test.getGradeBounds(currentTest);

		console.log(c, "CCC");

		setBoundaries(gb);
		setConfig(c);
	}

	useEffect(() => {
		Emitter.on("test", callData);
		Emitter.on("class", callData);

		return () => {
			Emitter.off("test", callData);
			Emitter.off("class", callData);
		};
	}, []);

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

			<Heading type="Primary" size="three" text="Test Configuration" cb={cb[0]} />
			<LabelSelectGrid
				options={Object.entries(config).map(
					([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`
				)}
			/>

			<Heading type="Primary" size="three" text="Grade Boundaries" cb={cb[1]} />
			<LabelSelectGrid
				options={Object.values(boundaries).map(
					(value, index) => `${value.name}: ${value.lb}%`
				)}
			/>
		</section>
	);
};

export default MenuLeft;
