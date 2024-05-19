import { FC, useState } from "react";
import LabelSelectGrid from "../Label-Select-Grid/Index";
import Heading from "../../Atoms/Headings";

const MenuRight: FC = () => {
	const tests = [
		"Formative_A1_PoetryAnalysis",
		"Summative_T1_Shakespeare_Macbeth",
		"Diagnostic_ReadingComprehensionAssessment",
		"Benchmark_Writing_PersuasiveEssay",
		"Checkpoint_Grammar_PunctuationRules",
		"Progress_SpeakingListening_DebateSkills",
	];
	const [test, setTest] = useState(tests[0]);

	const classes = ["9Y2E-G1", "7M1A-S3", "8S3F-G2", "11B2C-S1", "10G1D-G3"];
	const [class_, setClass] = useState(classes[0]);

	return (
		<section>
			<Heading type="Primary" size="three" text="Test" />
			<LabelSelectGrid
				options={tests}
				selected={test}
				callback={setTest}
			/>

			<Heading type="Primary" size="three" text="Class" />
			<LabelSelectGrid
				options={classes}
				selected={class_}
				callback={setClass}
			/>
		</section>
	);
};

export default MenuRight;
