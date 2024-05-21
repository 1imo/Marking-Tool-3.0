import { FC, useEffect, useState } from "react";
import LabelSelectGrid from "../Label-Select-Grid/Index";
import Heading from "../../Atoms/Headings";
import { Class } from "../../Services/Class";
import { Test } from "../../Services/Test";
import { Class as ClassType, Test as TestType } from "../../Services/Interfaces";

interface Props {
	cb: (() => void)[];
}

const MenuRight: FC<Props> = ({ cb }) => {
	const [tests, setTests] = useState<string[]>([]);
	const [classes, setClasses] = useState<string[]>([]);
	const [test, setTest] = useState<string>("");
	const [class_, setClass] = useState<string>("");

	async function callData() {
		const classObj = await Class.getAllClasses();
		const testNames = (await Test.getAllTests(classObj[0])).map((test) => test.name);
		const classNames = classObj.map((class_) => class_.name);

		setTests(testNames);
		setClasses(classNames);

		setTest(testNames[0] || "");
		setClass(classNames[0] || "");

		Class.setCurrentClass(class_);
		Test.setCurrentTest(test);
	}

	useEffect(() => {
		callData();
		console.log("RERENDER");
	}, []);

	useEffect(() => {
		if (test == Test.getCurrentTest()?.name) cb[1](); // Edit Test Name
	}, [test]);

	useEffect(() => {
		// No idea why it is coming back in an array
		const correctLength: boolean =
			class_.length === 1 && Class.getCurrentClass()?.name.length === 1;

		if (correctLength && class_[0] === Class.getCurrentClass()?.name[0]) {
			cb[3](); // Edit Class Name
		} else {
			Class.setCurrentClass(class_).then(async () => {
				const tests = await Test.getAllTests(Class.getCurrentClass());
				const testNames = tests.map((test_) => test_?.name);
				setTests(testNames);
				setTest(testNames[0] || "");
			});
		}
	}, [class_]);

	return (
		<section className="menu--right">
			<Heading type="Primary" size="three" text="Test" cb={() => cb[0]} />
			<LabelSelectGrid options={tests} selected={test} callback={setTest} />

			<Heading type="Primary" size="three" text="Class" cb={() => cb[2]} />
			<LabelSelectGrid options={classes} selected={class_} callback={setClass} />
		</section>
	);
};

export default MenuRight;
