import { db } from "./Db";

export class Class {
	private static currentClass: Class | null = null;
	id: any;

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

	static async getAllClasses(): Promise<Class[]> {
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
}
