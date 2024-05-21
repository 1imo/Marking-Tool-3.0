import { db } from "./Db";
import { Class } from "./Class";
import { Mode, TestResult, Test as TestType } from "./Interfaces";
import { Class as ClassType } from "./Interfaces";
import { Emitter } from "./emitter.config";

// Manage Test creation, storage, and retrieval
export class Test {
	private static currentTest: TestType | null = null;
	private static mode: Mode = Mode.Manual;
	private static studentTest: [TestResult | null, number] = [null, 0];

	static getMode(): Mode {
		return this.mode;
	}

	static setMode(mode: Mode) {
		this.mode = mode;
	}

	static getCurrentTest(): TestType | null {
		return this.currentTest;
	}

	// I know I should be working with IDs.
	static async setCurrentTest(name: string): Promise<void> {
		try {
			const test = await db.tests.where({ name }).first();
			if (test) {
				this.currentTest = test;
				Emitter.emit("test", true);
			} else {
				throw new Error(`Test ${name} not found`);
			}
		} catch (error) {
			console.error("Error setting current test:", error);
			throw error;
		}
	}

	static async getAllTests(
		currentClass: ClassType | null = Class.getCurrentClass()
	): Promise<TestType[]> {
		try {
			if (!currentClass) {
				throw new Error("No class selected");
			}

			const tests = await db.tests.where({ classID: currentClass.id }).toArray();
			return tests;
		} catch (error) {
			console.error("Error getting all tests:", error);
			return [];
		}
	}

	static async addTest(name: string, questions: number = 0, marks: number = 0): Promise<void> {
		try {
			const currentClass = Class.getCurrentClass();
			if (!currentClass) throw new Error("No class selected");

			const test: TestType = {
				name,
				classID: currentClass.id,
				questions,
				marks,
			};

			await db.tests.add(test);
			Emitter.emit("test", true);
		} catch (error) {
			console.error("Error adding test:", error);
			throw error;
		}
	}

	static async deleteTest(name: string): Promise<void> {
		try {
			await db.tests.where({ name }).delete();
			Emitter.emit("test", true);
		} catch (error) {
			console.error("Error deleting test:", error);
			throw error;
		}
	}

	static async updateTest(name?: string, questions?: number, marks?: number): Promise<void> {
		try {
			const currentTest = Test.getCurrentTest();
			if (!currentTest) throw new Error("No test selected");

			const test = await db.tests.get(currentTest.id);
			if (test) {
				if (name !== undefined) test.name = name;
				if (questions !== undefined) test.questions = questions;
				if (marks !== undefined) test.marks = marks;

				await db.tests.put(test);
				Emitter.emit("test", true);
			} else {
				throw new Error(`Test with id ${currentTest.id} not found`);
			}
		} catch (error) {
			console.error("Error updating test:", error);
			throw error;
		}
	}

	static async getTestQuestions(testId: number): Promise<any[]> {
		try {
			const questions = await db.questions.where({ testID: testId }).toArray();
			return questions;
		} catch (error) {
			console.error("Error getting test questions:", error);
			throw error;
		}
	}

	static async getGradeBounds(currentTest: TestType | null) {
		const gradeBounds = (
			await db.gradeBounds.where({ testID: currentTest.id ?? this.currentTest }).toArray()
		).sort((a, b) => a.lb - b.lb);

		return gradeBounds;
	}

	static async getGrades(
		studentTest: TestResult | null = null,
		newMarks: number = 0,
		currentTest: TestType
	) {
		const gradeBounds = await Test.getGradeBounds(currentTest);

		const existingMarks = studentTest?.marks ?? 0;
		const totalMarks = existingMarks + newMarks;
		const percentage = (totalMarks / currentTest.marks) * 100;
		const grade = gradeBounds.find((bound) => percentage >= bound.lb)?.name ?? "";

		return {
			grade,
			totalMarks,
			percentage,
		};
	}

	private static async submitTestResult(name: string, marks: number): Promise<void> {
		try {
			const currentClass = Class.getCurrentClass();
			const currentTest = Test.getCurrentTest();
			if (!currentClass || !currentTest) throw new Error("Class or test not selected");

			const { grade, totalMarks, percentage } = await Test.getGrades(
				this.studentTest[0],
				marks,
				currentTest
			);

			const testResult: TestResult = {
				testID: currentTest.id,
				studentName: name,
				grade,
				marks: totalMarks,
				percentage,
			};

			await db.results.add(testResult);
		} catch (error) {
			console.error("Error submitting test result:", error);
			throw error;
		}
	}

	static async updateTestResult(name: string, marks: number): Promise<void> {
		try {
			const currentTest = Test.getCurrentTest();
			if (!currentTest) throw new Error("No test selected");

			if (this.mode === Mode.Auto) {
				if (!this.studentTest[0]) {
					this.studentTest[0] = {
						testID: currentTest.id,
						studentName: name,
						grade: "",
						marks: 0,
						percentage: 0,
					};
				}

				const { grade, totalMarks, percentage } = await Test.getGrades(
					this.studentTest[0],
					marks,
					currentTest
				);

				this.studentTest[0].grade = grade;
				this.studentTest[0].marks = totalMarks;
				this.studentTest[0].percentage = percentage;

				if (this.studentTest[1] < currentTest.questions) {
					this.studentTest[1]++;
				} else {
					await this.submitTestResult(
						this.studentTest[0].studentName,
						this.studentTest[0].marks
					);
					this.studentTest = [null, 0];
				}
			} else {
				const testResult = await db.results.get({
					studentName: name,
					testID: currentTest.id,
				});
				if (testResult) {
					testResult.marks = marks;
					testResult.percentage = (marks / currentTest.marks) * 100;

					await db.results.put(testResult);
				} else {
					throw new Error(`Test result not found for student ${name}`);
				}
			}
		} catch (error) {
			console.error("Error updating test result:", error);
			throw error;
		}
	}

	static async uploadTest(file: File): Promise<void> {
		const formData = new FormData();
		formData.append("file", file);

		const response = await fetch("#", {
			method: "POST",
			body: formData,
		});
	}
}
