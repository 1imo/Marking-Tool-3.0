import { db } from "./Db";
import { TestResult, Class, Test, Mode } from "./Interfaces";

export class InMemory {
	private static currentTestResult: TestResult | null = null;
	private static currentClass: Class | null = null;
	private static currentTest: Test | null = null;
	private static currentMode: Mode | null = null;

	static async submitTest(studentID: string, marks: number): Promise<void> {
		try {
			if (this.currentTest && this.currentClass) {
				const percentage = (marks / this.currentTest.marks) * 100;
				const grade = await db.gradeBounds.get({
					testID: this.currentTest.id,
					lb: { $lte: percentage },
				});
				if (grade) {
					const testResult: TestResult = {
						studentID,
						testID: this.currentTest.id.toString(),
						grade: grade.name,
						marks,
						percentage,
					};
					await db.testResults.add(testResult);
					this.currentTestResult = testResult;
				} else {
					throw new Error("Grade not found");
				}
			} else {
				throw new Error("Test or Class not found");
			}
		} catch (error) {
			console.error("Error setting current test result:", error);
		}
	}

	// TestResult handling
	static getCurrentTestResult(): TestResult | null {
		return this.currentTestResult;
	}

	static async setCurrentTestResult(testResult: TestResult): Promise<void> {
		try {
			const res = await db.tests.get(testResult.id);
			if (res) {
				this.currentTestResult = testResult;
			} else {
				throw new Error(`TestResult with id ${testResult.id} not found`);
			}
		} catch (error) {
			console.error("Error setting current test result:", error);
		}
	}

	// Class handling
	static getCurrentClass(): Class | null {
		return this.currentClass;
	}

	static async setCurrentClass(currentClassName: string): Promise<void> {
		try {
			const class_ = await db.classes.get({ name: currentClassName });
			if (class_) {
				this.currentClass = class_;
			} else {
				throw new Error(`Class with name ${currentClassName} not found`);
			}
		} catch (error) {
			console.error("Error setting current class:", error);
			throw error;
		}
	}

	// Test handling
	static getCurrentTest(): Test | null {
		return this.currentTest;
	}

	static async setCurrentTest(testId: number): Promise<void> {
		try {
			const test = await db.tests.get(testId);
			if (test) {
				this.currentTest = test;
			} else {
				throw new Error(`Test with id ${testId} not found`);
			}
		} catch (error) {
			console.error("Error setting current test:", error);
			throw error;
		}
	}

	// Mode handling
	static getCurrentMode(): Mode | null {
		return this.currentMode;
	}

	static setCurrentMode(mode: Mode): void {
		this.currentMode = mode;
	}
}
