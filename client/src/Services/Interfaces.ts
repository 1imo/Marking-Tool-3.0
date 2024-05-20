// Interfaces.ts
export interface GradeBound {
	id?: number;
	name: string;
	lb: number;
	testID: number;
}

export interface Question {
	id?: number;
	questionNumber: string;
	questionText?: string;
	answerText?: string;
	marks: number;
	testID: string;
}

export interface Test {
	id?: number;
	name: string;
	classID: number;
	questions: number;
	marks: number;
}

export interface Class {
	id?: number;
	name: string;
}

export interface TestResult {
	id?: number;
	studentName: string;
	testID: number;
	grade: string;
	marks: number;
	percentage: number;
}

export enum Mode {
	Calculate = "Calculate",
	Manual = "Manual",
	Auto = "Auto Scan",
}

export enum Actions {
	CreateClass = "Create Class",
	DeleteClass = "Delete Class",
	EditTestConfig = "Edit Test Config",
	CreateTest = "Create Test",
	DeleteTest = "Delete Test",
	EditGradeBounds = "Edit Grade Bounds",
	DeleteGradeBounds = "Delete Grade Bounds",
}
