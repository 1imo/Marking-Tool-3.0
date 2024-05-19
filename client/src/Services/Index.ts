type EventCallback = (...args: any[]) => void;

export class EventEmitter {
	private events: { [eventName: string]: EventCallback[] };

	constructor() {
		this.events = {};
	}

	on(eventName: string, callback: EventCallback): void {
		if (!this.events[eventName]) {
			this.events[eventName] = [];
		}
		this.events[eventName].push(callback);
	}

	off(eventName: string, callback: EventCallback): void {
		if (this.events[eventName]) {
			this.events[eventName] = this.events[eventName].filter(
				(cb) => cb !== callback
			);
		}
	}

	emit(eventName: string, ...args: any[]): void {
		if (this.events[eventName]) {
			this.events[eventName].forEach((callback) => {
				callback(...args);
			});
		}
	}
}
