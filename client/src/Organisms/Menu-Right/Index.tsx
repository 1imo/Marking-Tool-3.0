import { FC, useEffect, useState, useRef } from "react";
import LabelSelectGrid from "../Label-Select-Grid/Index";
import Heading from "../../Atoms/Headings";
import { Class } from "../../Services/Class";
import { Test } from "../../Services/Test";
import { Class as ClassType, Test as TestType } from "../../Services/Interfaces";
import { Emitter } from "../../Services/emitter.config";

interface Props {
	cb: (() => void)[];
}

const MenuRight: FC<Props> = ({ cb }) => {
	const [tests, setTests] = useState<string[]>([]);
	const [classes, setClasses] = useState<string[]>([]);
	const [test, setTest] = useState<string>("");
	const [class_, setClass] = useState<string>("");

	const hasMounted = useRef(false);

	async function callData() {
		const classObj = await Class.getAllClasses();
		const testNames = (await Test.getAllTests(classObj[0])).map((test) => test.name);
		const classNames = classObj.map((class_) => class_.name);

		setTests(testNames);
		setClasses(classNames);

		setTest(testNames[0] || "");
		setClass(classNames[0] || "");

		Class.setCurrentClass(classNames[0]);
		Test.setCurrentTest(testNames[0]);

		console.log(Test.getCurrentTest(), "RIGHT");
	}

	useEffect(() => {
		callData().then(() => {
			hasMounted.current = true;
		});
	}, []);

	useEffect(() => {
		if (test === Test.getCurrentTest()?.name) cb[1](); // Edit Test Name
	}, [test]);

	useEffect(() => {
		if (!hasMounted.current) return;

		const correctLength: boolean =
			class_.length === 1 && Class.getCurrentClass()?.name.length === 1;

		if (
			correctLength &&
			class_[0]?.length > 1 &&
			class_[0] === Class.getCurrentClass()?.name[0]
		) {
			cb[3](); // Edit Class Name
		} else {
			Class.setCurrentClass(class_).then(async () => {
				const tests = await Test.getAllTests(Class.getCurrentClass());
				const testNames = tests.map((test_) => test_?.name);
				setTests(testNames);
				setTest(testNames[0] || "");
				Test.setCurrentTest(testNames[0] || "");
			});

			cb[4](); // Go Home
		}
	}, [class_]);

	useEffect(() => {
		if (!hasMounted.current) return;

		cb[3];
	}, [classes]);

	const handleChange = (change: "Class" | "Test", value: string) => {
		let changed = false;

		if (change === "Class") {
			setClass((prev) => {
				if (prev === value) {
					changed = true;

					return `${value}`;
				}

				return value;
			});

			if (changed) {
				cb[3](); // Edit Class Name
			} else {
				cb[4](); // Go Home
			}
		}

		if (change === "Test") {
			setTest((prev) => {
				if (prev === value) {
					changed = true;

					return `${value}`;
				}

				return value;
			});

			if (changed) {
				cb[1](); // Edit Test Name
			} else {
				cb[4](); // Go Home
			}
		}
	};

	return (
		<section className="menu--right">
			<Heading type="Primary" size="three" text="Test" cb={cb[0]} />
			<LabelSelectGrid
				options={tests}
				selected={test}
				callback={(value: string) => handleChange("Test", value)}
			/>

			<Heading type="Primary" size="three" text="Class" cb={cb[2]} />
			<LabelSelectGrid
				options={classes}
				selected={class_}
				callback={(value: string) => handleChange("Class", value)}
			/>
		</section>
	);
};

export default MenuRight;
