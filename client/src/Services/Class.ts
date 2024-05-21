import { db } from "./Db";
import { Class as ClassType } from "./Interfaces";

export class Class {
	private static currentClass: ClassType | null = null;
	id: any;

	static getCurrentClass(): ClassType | null {
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
