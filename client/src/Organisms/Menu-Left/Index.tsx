import { FC, useState } from "react";
import LabelSelectGrid from "../Label-Select-Grid/Index";
import Heading from "../../Atoms/Headings";

const MenuLeft: FC = () => {
	const options = ["Manual", "Calculate", "Auto Scan"];
	const config = { questions: 12, marks: 100 };
	const boundaries = { a: "80%", b: "60%", c: "40%", d: "20%" };
	const [mode, setMode] = useState(options[0]);

	return (
		<section>
			<Heading type="Primary" size="three" text="Mode" />
			<LabelSelectGrid
				options={options}
				selected={mode}
				callback={setMode}
			/>

			<Heading type="Primary" size="three" text="Test Configuration" />
			<LabelSelectGrid
				options={Object.entries(config).map(
					([key, value]) =>
						`${
							key.charAt(0).toUpperCase() + key.slice(1)
						}: ${value}`
				)}
			/>

			<Heading type="Primary" size="three" text="Grade Boundaries" />
			<LabelSelectGrid
				options={Object.entries(boundaries).map(
					([key, value]) =>
						`${
							key.charAt(0).toUpperCase() + key.slice(1)
						}: ${value}`
				)}
			/>
		</section>
	);
};

export default MenuLeft;
