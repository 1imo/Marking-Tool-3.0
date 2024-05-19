// db.ts
import Dexie, { Table } from "dexie";
import { Test, TestResult as Result, Class, Question, GradeBound } from "./Interfaces";

export class DB extends Dexie {
	tests!: Table<Test>;
	results!: Table<Result>;
	classes!: Table<Class>;
	questions!: Table<Question>;
	gradeBounds!: Table<GradeBound>;

	constructor() {
		super("myDatabase");
		this.version(1).stores({
			tests: "++id, name, classID, questions, marks",
			results: "++id, studentID, testID, grade, marks, percentage",
			classes: "++id, name",
			questions: "++id, questionNumber, questionText, answerText, marks, testID",
			gradeBounds: "++id, name, lb, testID",
		});
	}
}

export const db = new DB();
