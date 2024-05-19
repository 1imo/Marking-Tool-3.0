// Interfaces.ts
export interface GradeBound {
	id?: number;
	name: string;
	lb: number;
	testID: string;
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
	classID: string;
	questions: number;
	marks: number;
}

export interface Class {
	id?: number;
	name: string;
}

export interface TestResult {
	id?: number;
	studentID: string;
	testID: string;
	grade: string;
	marks: number;
	percentage: number;
}

export enum Mode {
	Calculate = "Calculate",
	Manual = "Manual",
	Auto = "Auto",
}
