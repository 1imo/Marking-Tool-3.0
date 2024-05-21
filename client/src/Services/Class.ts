import { db } from "./Db";
import { Class as ClassType } from "./Interfaces";

export class Class {
	private static currentClass: ClassType | null = null;
	id: any;

	static getCurrentClass(): ClassType | null {
		return this.currentClass;
	}

	static async setCurrentClass(currentClassName: string | string[]): Promise<void> {
		try {
			// Ensure the query is always an object with a string name property
			const query = Array.isArray(currentClassName)
				? { name: currentClassName } // Take the first element if it's an array
				: { name: [currentClassName] };

			// Retrieve class from the database
			const class_ = await db.classes.get(query);

			// Check if class exists and set it
			if (class_) {
				this.currentClass = class_;
			} else {
				throw new Error(`Class with name ${query.name} not found`); // Use query.name for error message
			}
		} catch (error) {
			console.error("Error setting current class:", error);
		}
	}

	static async getAllClasses(): Promise<ClassType[]> {
		try {
			const classes = await db.classes.toArray();
			return classes;
		} catch (error) {
			console.error("Error getting all classes:", error);
			throw error;
		}
	}

	static async addClass(className: string): Promise<void> {
		try {
			await db.classes.add({ name: className });
		} catch (error) {
			console.error("Error adding class:", error);
			throw error;
		}
	}

	static async deleteClass(className: string): Promise<void> {
		try {
			await db.classes.delete({ name: className });
		} catch (error) {
			console.error("Error deleting class:", error);
			throw error;
		}
	}

	static async editClass(className: string, newClassName: string): Promise<void> {
		try {
			await db.classes.where({ name: className }).modify({ name: newClassName });
		} catch (error) {
			console.error("Error editing class:", error);
			throw error;
		}
	}
}
