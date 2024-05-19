export interface GradeBound {
	name: string;
	lb: number;
}

export interface Question {
	questionNumber: string;
	questionText?: string;
	answerText?: string;
	marks: number;
}

export interface Test {
	id: string;
	name: string;
	class: string;
	gradeBounds: GradeBound[];
	questions: number;
	marks: number;
	questionSet: Question[];
}

export interface Class {
	id: string;
	name: string;
	tests: Test[];
}

export interface TestResult {
	studentID: string;
	testID: string;
	grade: string;
	marks: number;
	percentage: number;
}
