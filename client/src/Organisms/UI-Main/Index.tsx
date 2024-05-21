import { FC, useRef, useState } from "react";
import Input, { Props as InputProps } from "../../Molecules/Input/Index";
import BtnIcon from "../../Molecules/Btn-Icon/Index";
import "./Styles.css";
import BtnGrid from "../Btn-Grid/Index";
import { TestResult } from "../../Services/Interfaces";
import { Test } from "../../Services/Test";

interface Props {
	cb?: () => void;
}

// export interface TestResult {
// 	id?: number;
// 	studentID: string;
// 	testID: string;
// 	grade: string;
// 	marks: number;
// 	percentage: number;
// }

const UIMain: FC<Props> = ({ cb }) => {
	const studentName = useRef<HTMLInputElement | null>(null);
	const marks = useRef<HTMLInputElement | null>(null);

	let student: TestResult | null = null;

	function reset() {
		studentName.current!.value = "";
		marks.current!.value = "";
	}

	function next() {
		if (studentName?.current?.value && marks?.current?.value) {
			Test.updateTestResult(studentName.current.value, +marks.current.value);
		}
	}

	return (
		<section className="input--grid">
			<Input
				placeholder={"Student Name"}
				inputType={"text"}
				type="User"
				label="Student Name"
				r={studentName}
			/>
			<Input
				placeholder={"Marks"}
				inputType={"text"}
				type="Pie"
				label="Student Name"
				r={marks}
			/>
			<BtnGrid
				cbPrim={reset}
				textPrim="Reset"
				bgOne="--grey-three"
				colourOne="--grey-one"
				cbSec={next}
				bgTwo="--red"
				colourTwo="--white"
				textSec="Continue"
			/>
		</section>
	);
};

export default UIMain;
