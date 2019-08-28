export default function secan(options: {
	debug?: boolean | string,
	breakIframe?: boolean,
	debuggerLoop?: boolean,
	interval?: number,
	hookFn?: boolean,
	baitURL?: string,
	allowInlineScript?: boolean,
	pageDomain?: string,
	scriptDomain?: string | string[]
}): void;

declare global {
	interface WindowEventMap {
		eval: EvalEvent;
		alert: AlertEvent;
		console: ConsoleEvent;
		invaliddomain: InvalidDomainEvent;
		sslbreak: void;
		sslstrip: void;
		iniframe: void;
		headlessbrowser: void;
		invalidscript: InvalidScriptEvent;
		devtoolsopen: void;
	}
}

export interface SecanEvent {
	detail: any;
}

export interface EvalEvent extends SecanEvent {
	detail: {
		args: string;
	};
}

export interface AlertEvent extends SecanEvent {
	detail: {
		args: string;
	};
}

export interface ConsoleEvent extends SecanEvent {
	detail: {
		args: string;
	};
}

export interface InvalidDomainEvent extends SecanEvent {
	detail: {
		url: string;
	};
}

export interface InvalidScriptEvent extends SecanEvent {
	detail: {
		invalidScript: Array<string>;
	};
}