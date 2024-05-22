import InputGrid from "../../Organisms/Input-Grid/Index";
import UIMain from "../../Organisms/UI-Main/Index";
import { Class } from "../../Services/Class";
import { Test } from "../../Services/Test";

export const content = {
	"Create Class": () => (
		<InputGrid
			type="single"
			data={[{ name: "Class Name" }]}
			remove={false}
			cb={(arg: string) => {
				Class.addClass(arg);
				window.location.reload();
			}}
		/>
	),
	"Edit Class": async () => {
		const currentClass = Class.getCurrentClass();

		return (
			<InputGrid
				type="single"
				data={[{ name: currentClass?.name }]}
				remove={true}
				cb={(arg: string) => {
					Class.editClass(currentClass?.name || "", arg);
					window.location.reload();
				}}
				removeCb={(arg: string) => {
					Class.deleteClass(currentClass?.name || "");
					window.location.reload();
				}}
			/>
		);
	},
	"Create Test": () => (
		<InputGrid
			type="single"
			data={[{ name: "Test Name" }]}
			remove={false}
			cb={(arg: string) => {
				Test.addTest(arg);
				window.location.reload();
			}}
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
				cb={(arg: string) => {
					Test.updateTest(Test.getCurrentTest()?.name || "", arg);
					window.location.reload();
				}}
				removeCb={(arg: string) => {
					console.log(arg, "DELETE");
					Test.deleteTest(arg);
					window.location.reload();
				}}
			/>
		);
	},
	Home: () => <UIMain />,
	"Edit Test Config": () => {
		const test = Test.getCurrentTest();
		const config = {
			questions: test?.questions || 0,
			marks: test?.marks || 0,
		};

		return (
			<InputGrid
				type="double"
				data={[config]}
				remove={false}
				cb={(arg) => {
					Test.updateTest(test?.name, arg[0] || null, arg[1] || null);
					window.location.reload();
				}}
			/>
		);
	},
	"Edit Grade Boundaries": () => {
		return (
			<InputGrid
				type="double"
				data={[Test.getGradeBounds(Test.getCurrentTest() || null)]}
				remove={true}
				cb={(arg: string) => {
					console.log(arg);
				}}
				removeCb={(arg: string) => {
					console.log(arg);
				}}
			/>
		);
	},
};
